// priority: 60
ServerEvents.recipes(event => {
    let enabled = true;
    if (!enabled) {
        return;
    }
    console.log(`[Fluid Unification] Script starting..`);


    let startTime = Date.now();

    // Fluid recipe removals
    const removeRecipeIDs = [
        'productivemetalworks:alloying/pnc/plastic_from_lpg',
        'productivemetalworks:alloying/pnc/plastic_from_biodiesel'
    ]

    removeRecipeIDs.forEach(id => {
        console.log(`[Fluid Unification] Removing recipe: ${id}`);
        event.remove({
            id: id
        })
    })

    // Fluid Unification process
    const MOD_PRIORITIES = [
        "minecraft", "kubejs", "productivemetalworks", "oritech", "create",
        "pneumaticcraft", "tfmg", "railcraft", "biggerreactors",
        "enderio", "utilitarian", "actuallyadditions", "xycraft_world",
        "silentgems", "mffs", "createbigcannons", "iceandfire", "silentgear",
        "createpropulsion"
    ];

    const TARGET_MODS = ['create', 'tfmg', 'oritech', 'pneumaticcraft', 'enderio', 'createbigcannons'];

    const TARGET_MATERIALS = [
        'steel',
        'gasoline',
        'kerosene',
        'lpg',
        'ethylene',
        'naphtha',
        'creosote',
        'sulfuric_acid',
        'diesel',
        'heavy_oil',
        'crude_oil',
        'steam'
    ];

    // Recipes that should be skipped by the deep JSON scanner
    // NOTE: Create machine recipes (like sequenced_assembly) are sensitive to JSON re-injection.
    // They should ideally be handled using the specific Create KubeJS API instead of this global scanner.
    const BLACKLIST_RECIPE_TYPES = [
        'create:sequenced_assembly',
        'create:filling',
        'create:mixing',
        'create:compacting',
        'pneumaticcraft:amadron'
    ];

    const BLACKLIST_RECIPE_IDS = [
        /^exposure:/,
        /^exposure_expanded:/
    ];

    // Explicit overrides for tags where auto-detection fails
    const TAG_OVERRIDES = {
        'c:gasoline': 'pneumaticcraft:gasoline',
        'c:diesel': 'oritech:still_diesel',
        'c:kerosene': 'pneumaticcraft:kerosene',
        'c:lpg': 'pneumaticcraft:lpg',
        'c:ethylene': 'tfmg:ethylene',
        'c:ethylene': 'tfmg:ethylene',
        'c:naphtha': 'oritech:still_naphtha',
        'c:sulfuric_acid': 'oritech:still_sulfuric_acid'
    };

    // Map to cache: fluid_id -> unified_tag
    const fluidToTag = {};
    // Map to cache: unified_tag -> priority_fluid_id
    const tagToPriority = {};

    /**
     * Finds a unified tag (starts with 'c:') for a given fluid ID.
     */
    function getUnifiedTag(fluidId) {
        if (!fluidId || typeof fluidId !== 'string' || fluidId.startsWith('#') || fluidId.startsWith('c:')) return null;
        if (fluidToTag[fluidId]) return fluidToTag[fluidId];

        try {
            let fObj = Fluid.of(fluidId);
            if (fObj.empty) return null;

            // KubeJS 1.21.1+ Tag Lookup
            let tags = [];
            try {
                // Attempt standard KubeJS wrapper first
                tags = fObj.getTags().toArray();
            } catch (e) {
                // Fallback to direct registry holder lookup if the wrapper fails
                let resourceLocation = Utils.id(fluidId);
                let holder = BuiltInRegistries.FLUID.getHolder(resourceLocation);
                if (holder && holder.isPresent()) {
                    tags = holder.get().tags().toList().toArray();
                }
            }

            if (tags.length === 0) {
                console.log(`[Fluid Unification] No tags found for ${fluidId}`);
                return null;
            }

            for (let tag of tags) {
                // In NeoForge, tags are often TagKey objects; location() gets the ID
                let tagStr = "";
                if (tag.location) {
                    tagStr = String(tag.location());
                } else {
                    tagStr = String(tag);
                }

                if (tagStr.startsWith('c:')) {
                    // Filter by TARGET_MATERIALS whitelist
                    if (TARGET_MATERIALS.length > 0) {
                        let isTarget = TARGET_MATERIALS.some(mat => tagStr.includes(mat));
                        if (!isTarget) continue;
                    }

                    fluidToTag[fluidId] = tagStr;
                    console.log(`[Fluid Unification] Identified unified tag for ${fluidId}: ${tagStr}`);
                    return tagStr;
                }
            }
        } catch (e) {
            console.error(`[Fluid Unification] Error resolving tags for ${fluidId}: ${e}`);
        }
        return null;
    }

    function getPriorityFluid(tag) {
        if (tagToPriority[tag]) return tagToPriority[tag];

        // Check explicit overrides first
        if (TAG_OVERRIDES[tag]) {
            let override = TAG_OVERRIDES[tag];
            tagToPriority[tag] = override;
            console.log(`[Fluid Unification] Using explicit override for ${tag}: ${override}`);
            return override;
        }

        console.log(`[Fluid Unification] Searching priority fluid for tag: ${tag}`);

        // 1. Try common pattern: mod:fluid_name (e.g. c:molten_iron -> mod:molten_iron)
        // Extract the name part after c: or c:type/
        let name = tag.split('/').pop();
        if (name.includes(':')) name = name.split(':')[1];

        for (let mod of MOD_PRIORITIES) {
            let candidates = [
                `${mod}:${name}`,
                `${mod}:molten_${name}`,
                `${mod}:${name}_fluid`,
                `${mod}:liquid_${name}`,
                `${mod}:still_${name}`
            ];

            for (let candidate of candidates) {
                try {
                    let resourceLocation = Utils.id(candidate);
                    if (!BuiltInRegistries.FLUID.containsKey(resourceLocation)) continue;

                    let f = Fluid.of(candidate);
                    if (f.empty) continue;

                    // Robust Tag Lookup (Matches getUnifiedTag logic)
                    let fluidTags = [];
                    try {
                        fluidTags = f.getTags().toArray();
                    } catch (e) {
                        let holder = BuiltInRegistries.FLUID.getHolder(resourceLocation);
                        if (holder && holder.isPresent()) {
                            fluidTags = holder.get().tags().toList().toArray();
                        }
                    }

                    for (let t of fluidTags) {
                        let tStr = t.location ? String(t.location()) : String(t);
                        if (tStr === tag) {
                            tagToPriority[tag] = candidate;
                            console.log(`[Fluid Unification] Priority fluid found for ${tag}: ${candidate}`);
                            return candidate;
                        }
                    }
                } catch (e) {
                    // console.error(`[Fluid Unification] Error checking candidate ${candidate}: ${e}`);
                }
            }
        }

        console.log(`[Fluid Unification] No priority fluid found for tag: ${tag}`);
        return null;
    }

    const inputKeys = new Set(['input', 'inputs', 'ingredients', 'ingredient', 'fluidInput']);
    const outputKeys = new Set(['output', 'outputs', 'results', 'result', 'fluidOutput', 'fluidOutputs', 'transitional_item']);


    function deepTraverseAndFix(obj, isInputContext, recipeId) {
        let modified = false;

        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                if (deepTraverseAndFix(obj[i], isInputContext, recipeId)) modified = true;
            }
        } else if (typeof obj === 'object' && obj !== null) {
            for (let k of ['fluid', 'fluid_id', 'id', 'tag', 'fluidTag']) {
                if (k === 'tag' || k === 'fluidTag') {
                    if (obj[k]) {
                        console.log(`[Fluid Unification] [${recipeId}] ${obj[k]} is a ${k}, skipping`);
                    }
                    continue;
                } else {
                    if (obj[k] && typeof obj[k] === 'string' && obj[k].includes(':')) {
                        let val = obj[k];

                        // Check if it's a fluid
                        // Fluids typically have an 'amount' field OR use specific fluid keys
                        let isLikelyFluid = (k === 'fluid' || k === 'fluid_id' || k === 'fluidTag' || obj.amount !== undefined) && !obj.item;

                        if (!isLikelyFluid) continue;
                        console.log(`[Fluid Unification] [${recipeId}] Checking ${val} for tags...`)
                        let tag = getUnifiedTag(val);
                        if (tag) {
                            console.log(`[Fluid Unification] ${val} has ${tag}`);
                            if (isInputContext) {
                                console.log(`[Fluid Unification] Found fluid input: ${val} in input`);
                                // INPUT: Replace ID with Tag
                                if (recipeId.startsWith('oritech:')) {
                                    if (k === 'fluid') {
                                        obj[k] = '#' + tag;
                                        modified = true;
                                        console.log(`[Fluid Unification] [${recipeId}] Oritech input fix: ${val} -> #${tag}`);
                                    }
                                } else {
                                    delete obj[k];
                                    obj['tag'] = tag;
                                    obj['type'] = 'neoforge:tag';
                                    modified = true;
                                    console.log(`[Fluid Unification] [${recipeId}] Swapping fluid input to tag: ${val} -> neoforge:tag/${tag}`);
                                }
                            } else {
                                console.log(`[Fluid Unification] Found fluid input: ${val} in output`);
                                // OUTPUT: Replace ID with Priority ID
                                let priority = getPriorityFluid(tag);
                                if (priority && priority !== val) {
                                    console.log(`[Fluid Unification] [${recipeId}] Fixing fluid output '${k}': ${val} -> ${priority}`);
                                    obj[k] = priority;
                                    modified = true;
                                } else if (!priority) {
                                    console.log(`[Fluid Unification] [${recipeId}] No priority fluid found for tag ${tag}`);
                                }
                            }
                        } else {
                            console.log(`[Fluid Unification] [${recipeId}] No unified tag found for fluid ${val}`);
                        }
                    }
                }
            }

            // Fix for KubeJS serialization of fluid stacks
            if (obj.fluid && obj.type === 'fluid_stack') {
                delete obj.type;
            }

            // Recurse
            for (let key in obj) {
                // FIX: Flatten nested items in results (ONLY for Sequenced Assembly which is known to be picky)
                if (recipeId.includes('sequenced_assembly') && (key === 'results' || key === 'output' || key === 'outputs' || key === 'transitional_item')) {
                    console.log(`[Fluid Unification] Checking ${recipeId} for ${key}`)
                    let val = obj[key];
                    if (Array.isArray(val)) {
                        val.forEach(item => {
                            if (item.item && typeof item.item === 'object' && item.item.id) {
                                item.id = item.item.id;
                                delete item.item;
                                modified = true;
                            } else if (item.item && !item.id) {
                                item.id = item.item;
                                delete item.item;
                                modified = true;
                            }
                        });
                    } else if (typeof val === 'object' && val !== null) {
                        // Handle single objects like transitional_item
                        if (val.item && typeof val.item === 'object' && val.item.id) {
                            val.id = val.item.id;
                            delete val.item;
                            modified = true;
                        } else if (val.item && !val.id) {
                            val.id = val.item;
                            delete val.item;
                            modified = true;
                        }
                    }
                }

                let childInputContext = isInputContext;
                if (inputKeys.has(key)) childInputContext = true;
                else if (outputKeys.has(key)) childInputContext = false;

                if (deepTraverseAndFix(obj[key], childInputContext, recipeId)) modified = true;
            }
        }
        return modified;
    }

    // 2. DEEP JSON REPLACEMENTS (For complex machine recipes)
    console.log(`[Fluid Unification] Starting deep JSON scan for mods: ${TARGET_MODS.join(', ')}`);
    TARGET_MODS.forEach(modid => {
        let count = 0;
        event.forEachRecipe({ mod: modid }, recipe => {
            count++;
            let json = recipe.json;
            if (!json || !json.isJsonObject()) return;

            let recipeId = recipe.getId();
            let rootObj = JSON.parse(json.toString());
            let recipeType = rootObj.type || "";

            // Check Blacklists
            if (BLACKLIST_RECIPE_TYPES.includes(recipeType)) return;
            for (let pattern of BLACKLIST_RECIPE_IDS) {
                if (pattern.test(recipeId)) return;
            }

            // Skip certain Oritech recipes that are known to be sensitive
            if (recipeId.startsWith('oritech:fuelgen') || recipeId.startsWith('oritech:cooler')) return;

            if (deepTraverseAndFix(rootObj, null, recipeId)) {
                try {
                    event.remove({ id: recipeId });
                    event.custom(rootObj).id(recipeId);
                } catch (err) {
                    console.error(`[Fluid Unification] Error re-registering ${recipeId}: ${err}`);
                }
            }
        });
        console.log(`[Fluid Unification] Scanned ${count} recipes for mod: ${modid}`);
    });

    /**
     * Deeply searches a specific recipe for a material match and replaces it.
     * Capable of handling any JSON layout and intelligently swapping between tags/IDs.
     */
    function applyTargetedChange(event, target) {
        console.log(`[Fluid Unification] Attempting targeted change for recipe: ${target.recipeId}`);
        let found = false;

        // Extract the target value from the 'from' object (could be under 'fluid', 'item', 'id', etc.)
        let fromVal = target.from.fluid || target.from.item || target.from.id || target.from.tag;

        event.forEachRecipe({ id: target.recipeId }, recipe => {
            found = true;
            let rootObj = JSON.parse(recipe.json.toString());

            function traverse(obj, isInput) {
                let modified = false;
                if (Array.isArray(obj)) {
                    obj.forEach(child => { if (traverse(child, isInput)) modified = true; });
                } else if (obj !== null && typeof obj === 'object') {
                    // Search for the material value across all common identity keys
                    let matchedKey = null;
                    for (let k of ['fluid', 'item', 'tag', 'id', 'fluid_id', 'fluidTag']) {
                        let val = obj[k];
                        if (val === fromVal || (typeof val === 'string' && val === '#' + fromVal)) {
                            matchedKey = k;
                            break;
                        }
                    }

                    if (matchedKey) {
                        // Ensure we are in the correct context (input vs output)
                        let contextMatch = (target.changeType === 'input' && isInput) || (target.changeType === 'output' && !isInput);
                        if (contextMatch) {
                            console.log(`[Fluid Unification] Match found in ${target.recipeId} (${isInput ? 'input' : 'output'}) at key '${matchedKey}'. Applying change...`);

                            // Clear existing identity keys to prevent schema conflicts
                            ['fluid', 'item', 'tag', 'id', 'fluid_id', 'fluidTag'].forEach(k => delete obj[k]);

                            for (let key in target.to) {
                                let toVal = target.to[key];
                                // Smart tag handling: Outputs generally cannot be tags
                                if (key === 'tag' && !isInput) {
                                    let priority = getPriorityFluid(toVal);
                                    if (priority) {
                                        console.log(`[Fluid Unification] Resolving output tag ${toVal} to ${priority}`);
                                        // If the original recipe used 'id', we should probably stick to it
                                        obj[matchedKey === 'id' ? 'id' : 'fluid'] = priority;
                                    } else {
                                        console.warn(`[Fluid Unification] Could not resolve output tag ${toVal} to fluid!`);
                                        obj['tag'] = toVal;
                                    }
                                } else {
                                    obj[key] = toVal;
                                }
                            }
                            modified = true;
                        }
                    }

                    // Recurse and track context
                    for (let key in obj) {
                        let childInput = isInput;
                        if (inputKeys.has(key)) childInput = true;
                        else if (outputKeys.has(key)) childInput = false;

                        if (traverse(obj[key], childInput)) modified = true;
                    }
                }
                return modified;
            }

            // Initial context is based on changeType, but traversal will correct it as it goes deeper
            if (traverse(rootObj, target.changeType === 'input')) {
                try {
                    event.remove({ id: target.recipeId });
                    event.custom(rootObj).id(target.recipeId);
                    console.log(`[Fluid Unification] Successfully updated recipe: ${target.recipeId}`);
                } catch (e) {
                    console.error(`[Fluid Unification] Failed to re-register recipe ${target.recipeId}: ${e}`);
                }
            } else {
                console.log(`[Fluid Unification] Traversed ${target.recipeId} but no changes were applied.`);
            }
        });
        if (!found) {
            console.log(`[Fluid Unification] Recipe not found: ${target.recipeId}`);
        }
    }


    let targets = [{
        "recipeId": "tfmg:coking/coal",
        "changeType": "output",
        "from": {
            "id": "tfmg:creosote"
        },
        "to": {
            "id": "railcraft:creosote"
        }
    }, {
        "recipeId": "tfmg:coking/charcoal",
        "changeType": "output",
        "from": {
            "id": "tfmg:creosote"
        },
        "to": {
            "id": "railcraft:creosote"
        }
    }];


    targets.forEach(t => applyTargetedChange(event, t));


    let duration = Date.now() - startTime;
    console.log(`[Fluid Unification] Completed deep JSON scan in ${duration}ms`);
});
