// priority: 50

ServerEvents.recipes(event => {
    let startTime = Date.now();
    const materials = [
        'sulfur', 'salt', 'iron', 'gold', 'copper', 'tin', 'lead', 'silver',
        'nickel', 'aluminum', 'zinc', 'uranium', 'platinum', 'osmium',
        'bauxite', 'tungsten', 'iridium', 'titanium', 'coal', 'diamond',
        'emerald', 'lapis', 'redstone', 'quartz', 'rubber', 'silicon'
    ];

    const types = {
        'dusts': 'dust',
        'ingots': 'ingot',
        'nuggets': 'nugget',
        'ores': 'ore',
        'raw_materials': 'raw',
        'storage_blocks': 'block',
        'gears': 'gear',
        'plates': 'plate',
        'rods': 'rod',
        'wires': 'wire'
    };

    // Mods known to have custom recipe schemas that KubeJS native replaceInput misses
    const targetMods = [
        'tfmg', 'enderio', 'railcraft', 'create', 'oritech', 'actuallyadditions',
        'pneumaticcraft', 'utilitarian', 'productivebees', 'silentgems', 'iceandfire', "createpropulsion"
    ];

    const priorities = [
        'minecraft', 'kubejs', 'productivemetalworks', 'oritech', 'create', 'pneumaticcraft', 'tfmg', 'railcraft',
        'biggerreactors', 'enderio', 'utilitarian', 'actuallyadditions', 'xycraft_world',
        'silentgems', 'mffs', 'createbigcannons', 'iceandfire', 'silentgear', "createpropulsion"

    ];

    const priorityCache = {};

    function getPriorityItem(mat, typeName) {
        let cacheKey = `${mat}_${typeName}`;
        if (priorityCache[cacheKey] !== undefined) return priorityCache[cacheKey];

        for (let mod of priorities) {
            let item1 = `${mod}:${mat}_${typeName}`;
            if (Item.exists(item1)) {
                priorityCache[cacheKey] = item1;
                return item1;
            }
            let item2 = `${mod}:${typeName}_${mat}`;
            if (Item.exists(item2)) {
                priorityCache[cacheKey] = item2;
                return item2;
            }
            if (typeName === 'raw') {
                let item3 = `${mod}:raw_${mat}`;
                if (Item.exists(item3)) {
                    priorityCache[cacheKey] = item3;
                    return item3;
                }
            }
        }
        priorityCache[cacheKey] = null;
        return null;
    }

    const inputReplacements = {};
    const outputReplacements = {};

    targetMods.forEach(mod => {
        Ingredient.of(`@${mod}`).getItemIds().forEach(itemStr => {
            itemStr = String(itemStr);
            let idPart = itemStr.split(':')[1];

            for (let mat of materials) {
                for (let type of Object.keys(types)) {
                    let typeName = types[type];
                    if (idPart === `${mat}_${typeName}` || idPart === `${typeName}_${mat}` || (typeName === 'raw' && idPart === `raw_${mat}`)) {
                        inputReplacements[itemStr] = `c:${type}/${mat}`; // No hash for JSON

                        let priorityItem = getPriorityItem(mat, typeName);
                        if (priorityItem && priorityItem !== itemStr) {
                            outputReplacements[itemStr] = priorityItem;
                        }
                    }
                }
            }
        });
    });

    // Add explicit overrides
    inputReplacements['enderio:powdered_coal'] = 'c:dusts/coal';
    inputReplacements['tfmg:silicon_ingot'] = 'c:silicon';
    outputReplacements['tfmg:silicon_ingot'] = 'oritech:silicon';
    outputReplacements['oritech:silicon'] = 'oritech:silicon'; // Ensure it's not replaced by something lower priority

    // Molten Metal Buckets Unification
    const moltenMetals = [
        'steel'
    ];
    moltenMetals.forEach(metal => {
        let tag = `c:buckets/molten_${metal}`;
        let priority = `productivemetalworks:molten_${metal}_bucket`;
        if (Item.exists(priority)) {
            let tfmgBucket = `tfmg:molten_${metal}_bucket`;
            let cbcBucket = `createbigcannons:molten_${metal}_bucket`;
            let createBucket = `create:molten_${metal}_bucket`;

            if (Item.exists(tfmgBucket)) {
                inputReplacements[tfmgBucket] = tag;
                outputReplacements[tfmgBucket] = priority;
            }
            if (Item.exists(cbcBucket)) {
                inputReplacements[cbcBucket] = tag;
                outputReplacements[cbcBucket] = priority;
            }
            if (Item.exists(createBucket)) {
                inputReplacements[createBucket] = tag;
                outputReplacements[createBucket] = priority;
            }
        }
    });

    let coalPriority = getPriorityItem('coal', 'dust');
    if (coalPriority && coalPriority !== 'enderio:powdered_coal') {
        outputReplacements['enderio:powdered_coal'] = coalPriority;
    }

    // 1. STANDARD REPLACEMENTS (Catches 90% of normal recipes)
    Object.keys(inputReplacements).forEach(rogueItem => {
        if (!Item.exists(rogueItem)) return;
        
        console.log(`[Global Unification] Replacing input ${rogueItem} with #${inputReplacements[rogueItem]}`);
        try {
            event.replaceInput({}, rogueItem, `#${inputReplacements[rogueItem]}`);
        } catch (err) {
            console.error(`[Global Unification Error] Failed to replace input ${rogueItem}: ${err}`);
        }
    });
    Object.keys(outputReplacements).forEach(rogueItem => {
        if (!Item.exists(rogueItem)) return;

        console.log(`[Global Unification] Replacing output ${rogueItem} with ${outputReplacements[rogueItem]}`);
        try {
            event.replaceOutput({}, rogueItem, outputReplacements[rogueItem]);
        } catch (err) {
            console.error(`[Global Unification Error] Failed to replace output ${rogueItem}: ${err}`);
        }
    });

    // 2. DEEP JSON REPLACEMENTS (For Create, TFMG, Railcraft, ProductiveBees, etc.)
    // These mods use custom JSON structures (like 'id' instead of 'item' in arrays) that KubeJS ignores.
    // We physically extract the JSON, mutate it, delete the original, and inject the fixed version.
    //
    // IMPORTANT: Mods with strict ingredient parsers (EnderIO, PneumaticCraft) are EXCLUDED here.
    // Their recipes are fully handled by the standard replaceInput/replaceOutput above.
    // Re-injecting them would break their parser because it expects "item"/"tag" not "id".

    // Recipe type prefixes that use strict custom parsers — we must NOT deep-patch these.
    // KubeJS's standard replaceInput/replaceOutput already handles them correctly.
    const strictSchemaPrefixes = [
        'enderio:',
        'pneumaticcraft:',
    ];

    function isStrictSchemaRecipe(recipeType) {
        for (let prefix of strictSchemaPrefixes) {
            if (recipeType.startsWith(prefix)) return true;
        }
        return false;
    }

    // A map of tags to their priority items for forcing tag outputs to specific items
    const tagToPriorityItem = {};
    materials.forEach(mat => {
        Object.keys(types).forEach(type => {
            let typeName = types[type];
            let tag = `c:${type}/${mat}`;
            let priority = getPriorityItem(mat, typeName);
            if (priority) tagToPriorityItem[tag] = priority;
        });
    });

    // Keys that hold ingredient arrays/objects in machine recipes
    const inputKeys = new Set(['input', 'inputs', 'ingredients', 'ingredient']);

    function deepTraverseAndFix(element, recipeId, isInIngredientContext) {
        let localModified = false;

        if (element.isJsonObject()) {
            let obj = element.getAsJsonObject();

            // Skip NeoForge conditions (like tag_empty) which REQUIRE a 'tag' key.
            if (obj.has('type') && obj.get('type').isJsonPrimitive()) {
                let typeStr = obj.get('type').getAsString();
                if (typeStr.includes('tag_empty')) return false;
            }

            // 1. Fix rogue item IDs used as OUTPUTS.
            //    We skip this entirely for ingredient contexts — those are handled by replaceInput in step 1.
            if (!isInIngredientContext) {
                if (obj.has('id') && obj.get('id').isJsonPrimitive()) {
                    let idVal = obj.get('id').getAsString();
                    if (outputReplacements[idVal] && outputReplacements[idVal] !== idVal) {
                        console.log(`[Unification Debug] [${recipeId}] Fixing output 'id': ${idVal} -> ${outputReplacements[idVal]}`);
                        obj.addProperty('id', outputReplacements[idVal]);
                        localModified = true;
                    }
                }
                if (obj.has('item') && obj.get('item').isJsonPrimitive()) {
                    let itemVal = obj.get('item').getAsString();
                    if (outputReplacements[itemVal] && outputReplacements[itemVal] !== itemVal) {
                        console.log(`[Unification Debug] [${recipeId}] Fixing output 'item': ${itemVal} -> ${outputReplacements[itemVal]}`);
                        obj.addProperty('item', outputReplacements[itemVal]);
                        localModified = true;
                    }
                }

                // 2. Fix rogue TAGS in outputs ONLY.
                //    Output definitions in machine recipes usually have 'chance', 'probability', or 'count'.
                if (obj.has('tag') && obj.get('tag').isJsonPrimitive()) {
                    let tagVal = obj.get('tag').getAsString();
                    if (tagToPriorityItem[tagVal]) {
                        if (obj.has('chance') || obj.has('probability') || obj.has('count')) {
                            console.log(`[Unification Debug] [${recipeId}] Forcing tag output to priority item: ${tagVal} -> ${tagToPriorityItem[tagVal]}`);
                            obj.remove('tag');
                            obj.addProperty('id', tagToPriorityItem[tagVal]);
                            localModified = true;
                        }
                    }
                }
            }

            // 3. Recurse down, propagating ingredient context based on known input keys
            for (let entry of obj.entrySet()) {
                let key = entry.getKey();
                // A child is in ingredient context if its parent key is a known input key,
                // OR if it is already inside an ingredient context (for nested ingredient arrays).
                let childIsIngredient = isInIngredientContext || inputKeys.has(key);
                if (deepTraverseAndFix(entry.getValue(), recipeId, childIsIngredient)) {
                    localModified = true;
                }
            }
        } else if (element.isJsonArray()) {
            let arr = element.getAsJsonArray();
            for (let i = 0; i < arr.size(); i++) {
                if (deepTraverseAndFix(arr.get(i), recipeId, isInIngredientContext)) {
                    localModified = true;
                }
            }
        }

        return localModified;
    }

    // Iterate through all recipes from offending mods
    targetMods.forEach(modid => {
        event.forEachRecipe({ mod: modid }, recipe => {
            let json = recipe.json;
            if (!json || !json.isJsonObject()) return;

            let recipeId = recipe.getId();

            // Determine recipe type from JSON
            let recipeType = json.getAsJsonObject().has('type')
                ? json.getAsJsonObject().get('type').getAsString()
                : '';

            // Skip strict-schema recipe types entirely — their standard replaceInput/replaceOutput
            // already ran in step 1 and these parsers cannot handle re-injected "id" shorthand keys.
            if (isStrictSchemaRecipe(recipeType)) return;

            try {
                let didModify = deepTraverseAndFix(json, recipeId, false);
                if (didModify) {
                    console.log(`[Unification Debug] [${recipeId}] Successfully mutated JSON and re-injected recipe.`);
                    event.remove({ id: recipeId });
                    event.custom(json).id(recipeId);
                }
            } catch (err) {
                console.error(`[Unification Error] [${recipeId}] Failed to process/inject: ${err}`);
            }
        });
    });

    // =========================================================================
    // 3. MANUAL STRICT-SCHEMA PATCHES
    // =========================================================================
    // For EnderIO / PneumaticCraft recipes that need specific output corrections
    // that the generic replaceOutput missed (e.g. custom 'id' fields in outputs).
    //
    // Use patchStrictRecipe(id, outputPatches) where outputPatches is a map of
    //   { 'old_item_id': 'new_item_id' }
    // applied to every "id" or "item" value found in the recipe JSON.
    // All ingredient "id" shorthand keys are normalised to "item" before re-injection
    // so the strict parsers don't crash.
    // =========================================================================

    const inputKeySet = new Set(['input', 'inputs', 'ingredients', 'ingredient']);

    /** Recursively convert {"id":"mod:item"} -> {"item":"mod:item"} in ingredient subtrees. */
    function normaliseStrictIngredients(element) {
        if (element.isJsonObject()) {
            let obj = element.getAsJsonObject();
            if (obj.has('id') && !obj.has('item') && !obj.has('tag')) {
                let val = obj.get('id').getAsString();
                if (val.includes(':')) {
                    obj.remove('id');
                    obj.addProperty('item', val);
                }
            }
            for (let entry of obj.entrySet()) {
                normaliseStrictIngredients(entry.getValue());
            }
        } else if (element.isJsonArray()) {
            let arr = element.getAsJsonArray();
            for (let i = 0; i < arr.size(); i++) {
                normaliseStrictIngredients(arr.get(i));
            }
        }
    }

    /**
     * Patches a single strict-schema recipe (EnderIO, PneumaticCraft, etc.):
     *  - Applies idPatches: replaces any "id" or "item" primitive value in the JSON tree.
     *  - Applies tagPatches: replaces any "tag" primitive value in the JSON tree,
     *    converting the object from {"tag":"old"} to {"id":"new_item"} in-place.
     *  - Normalises all ingredient "id" shorthand to "item" so the parser doesn't crash.
     *  - Re-injects the recipe only if something actually changed.
     *
     * @param {string} recipeId   - full recipe ID, e.g. 'enderio:sag_milling/coal'
     * @param {Object} idPatches  - { 'old_item_id': 'new_item_id' }  (matches "id" / "item" values)
     * @param {Object} tagPatches - { 'old_tag': 'new_item_id' }       (matches "tag" values, replaces with concrete item)
     */
    function patchStrictRecipe(recipeId, idPatches, tagPatches) {
        idPatches = idPatches || {};
        tagPatches = tagPatches || {};

        event.forEachRecipe({ id: recipeId }, recipe => {
            let json = recipe.json;
            if (!json || !json.isJsonObject()) return;

            let rootObj = json.getAsJsonObject();
            let modified = false;

            // Walk the whole tree and apply id/item patches and tag-to-item conversions
            function applyPatches(element) {
                if (element.isJsonObject()) {
                    let obj = element.getAsJsonObject();

                    // Patch "id" / "item" string values
                    for (let key of ['id', 'item']) {
                        if (obj.has(key) && obj.get(key).isJsonPrimitive()) {
                            let val = obj.get(key).getAsString();
                            if (idPatches[val]) {
                                console.log(`[Unification Debug] [${recipeId}] Patch '${key}': ${val} -> ${idPatches[val]}`);
                                obj.addProperty(key, idPatches[val]);
                                modified = true;
                            }
                        }
                    }

                    // Convert "tag" outputs to concrete item "id"
                    if (obj.has('tag') && obj.get('tag').isJsonPrimitive()) {
                        let tagVal = obj.get('tag').getAsString();
                        if (tagPatches[tagVal]) {
                            console.log(`[Unification Debug] [${recipeId}] Patch tag '${tagVal}' -> id '${tagPatches[tagVal]}'`);
                            obj.remove('tag');
                            obj.addProperty('id', tagPatches[tagVal]);
                            modified = true;
                        }
                    }

                    for (let entry of obj.entrySet()) {
                        applyPatches(entry.getValue());
                    }
                } else if (element.isJsonArray()) {
                    let arr = element.getAsJsonArray();
                    for (let i = 0; i < arr.size(); i++) {
                        applyPatches(arr.get(i));
                    }
                }
            }

            applyPatches(json);

            // Normalise ingredient "id" shorthand to "item" in all input subtrees.
            // Do NOT set modified=true unconditionally — only re-inject if applyPatches changed something.
            for (let entry of rootObj.entrySet()) {
                if (inputKeySet.has(entry.getKey())) {
                    normaliseStrictIngredients(entry.getValue());
                }
            }

            if (modified) {
                console.log(`[Unification Debug] [${recipeId}] Manual strict patch applied, re-injecting.`);
                // event.custom() requires a Rhino JS object or string — NOT a raw Gson JsonElement.
                // json.toString() serialises the (mutated) Gson tree to a JSON string;
                // JSON.parse() then converts that into a proper Rhino JS object.
                let jsObj = JSON.parse(json.toString());
                event.remove({ id: recipeId });
                event.custom(jsObj).id(recipeId);
            }
        });
    }

    // ----- EnderIO SAG Mill fixes -----
    // enderio:sag_milling/coal: coal -> coal dust (x2) + chance sulfur dust
    // Original JSON uses {"tag":"c:dusts/sulfur"} for the sulfur output slot.
    patchStrictRecipe(
        'enderio:sag_milling/coal',
        {
            // id patches: swap rogue item IDs in output slots
            'enderio:powdered_coal': 'oritech:coal_dust',  // coal dust -> oritech priority
        },
        {
            // tag patches: force tag outputs to a specific priority item
            'c:dusts/sulfur': 'tfmg:sulfur_dust',          // sulfur dust -> tfmg priority
        }
    );


    patchStrictRecipe(
        'enderio:sag_milling/raw_gold',
        {
            // id patches: swap rogue item IDs in output slots
            'enderio:gold_dust': 'oritech:gold_dust',  // coal dust -> oritech priority
        },
        {
            // tag patches: force tag outputs to a specific priority item
            'c:dusts/copper': 'tfmg:copper_dust',
        }
    );
    let duration = Date.now() - startTime;
    console.log(`[Global Unification] Completed item replacements in ${duration}ms`);
});
