// priority: 60
ServerEvents.recipes(event => {
    let enabled = true;
    if (!enabled) {
        return;
    }


    let startTime = Date.now();
    const MOD_PRIORITIES = [
        "minecraft", "kubejs", "productivemetalworks", "oritech", "create",
        "pneumaticcraft", "tfmg", "railcraft", "biggerreactors",
        "enderio", "utilitarian", "actuallyadditions", "xycraft_world",
        "silentgems", "mffs", "createbigcannons", "iceandfire", "silentgear",
        "createpropulsion"
    ];

    const TARGET_MODS = ['create', 'tfmg', 'oritech', 'pneumaticcraft', 'enderio', 'createbigcannons'];

    const TARGET_MATERIALS = [
        'steel'
    ];

    // Recipes that should be skipped by the deep JSON scanner
    // NOTE: Create machine recipes (like sequenced_assembly) are sensitive to JSON re-injection.
    // They should ideally be handled using the specific Create KubeJS API instead of this global scanner.
    const BLACKLIST_RECIPE_TYPES = [
        'create:sequenced_assembly',
        'create:filling',
        'create:mixing',
        'create:compacting'
    ];

    const BLACKLIST_RECIPE_IDS = [
        /^exposure:/,
        /^exposure_expanded:/
    ];

    // Map to cache: fluid_id -> unified_tag
    const fluidToTag = {};
    // Map to cache: unified_tag -> priority_fluid_id
    const tagToPriority = {};

    /**
     * Finds a unified tag (starts with 'c:') for a given fluid ID.
     */
    function getUnifiedTag(fluidId) {
        if (!fluidId || fluidId.startsWith('#') || fluidId.startsWith('c:')) return null;
        if (fluidToTag[fluidId]) return fluidToTag[fluidId];
        try {
            // Check existence in registry first to avoid log spam
            let resourceLocation = Utils.id(fluidId);
            if (!BuiltInRegistries.FLUID.containsKey(resourceLocation)) return null;

            let fObj = Fluid.of(fluidId);
            if (fObj.empty) return null;

            let tags = fObj.getTags().toArray();
            for (let tag of tags) {
                let tagStr = String(tag.location() || tag);
                if (tagStr.startsWith('c:')) {
                    // Filter by TARGET_MATERIALS if the list is not empty
                    if (TARGET_MATERIALS.length > 0) {
                        let isTarget = TARGET_MATERIALS.some(mat => tagStr.includes(mat));
                        if (!isTarget) continue;
                    }

                    fluidToTag[fluidId] = tagStr;
                    return tagStr;
                }
            }
        } catch (e) {
            // If it throws, it's not a valid fluid ID we can unify
            return null;
        }
        return null;
    }

    function getPriorityFluid(tag) {
        if (tagToPriority[tag]) return tagToPriority[tag];

        // 1. Try common pattern: mod:fluid_name (e.g. c:molten_iron -> mod:molten_iron)
        // Extract the name part after c: or c:type/
        let name = tag.split('/').pop();
        if (name.includes(':')) name = name.split(':')[1];

        for (let mod of MOD_PRIORITIES) {
            let candidates = [
                `${mod}:${name}`,
                `${mod}:molten_${name}`,
                `${mod}:${name}_fluid`,
                `${mod}:liquid_${name}`
            ];

            for (let candidate of candidates) {
                try {
                    // Use the registry to check if it exists before calling Fluid.of() 
                    // to avoid log spam from KubeJS's internal parser
                    let resourceLocation = Utils.id(candidate);
                    if (!BuiltInRegistries.FLUID.containsKey(resourceLocation)) continue;

                    let f = Fluid.of(candidate);
                    if (!f.empty) {
                        // Verify this fluid actually has the tag
                        let tags = f.getTags().toArray();
                        for (let t of tags) {
                            if (String(t.location() || t) === tag) {
                                tagToPriority[tag] = candidate;
                                return candidate;
                            }
                        }
                    }
                } catch (e) { }
            }
        }

        return null;
    }

    const inputKeys = new Set(['input', 'inputs', 'ingredients', 'ingredient', 'fluidInput']);

    function deepTraverseAndFix(obj, isInputContext, recipeId) {
        let modified = false;

        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                if (deepTraverseAndFix(obj[i], isInputContext, recipeId)) modified = true;
            }
        } else if (typeof obj === 'object' && obj !== null) {

            for (let k of ['fluid', 'fluid_id', 'id', 'tag', 'fluidTag']) {
                if (obj[k] && typeof obj[k] === 'string' && obj[k].includes(':')) {
                    let val = obj[k];

                    // Check if it's a fluid (must not have an 'item' key in the same object)
                    let isLikelyFluid = (k === 'fluid' || k === 'fluid_id' || k === 'fluidTag' || (obj.amount !== undefined)) && !obj.item;
                    if (!isLikelyFluid) continue;

                    let tag = getUnifiedTag(val);
                    if (tag) {
                        if (isInputContext) {
                            // INPUT: Replace ID with Tag
                            if (recipeId.startsWith('oritech:')) {
                                if (k === 'fluid') {
                                    obj[k] = '#' + tag;
                                    modified = true;
                                }
                            } else {
                                delete obj[k];
                                obj['tag'] = tag;
                                if (obj['type'] === 'neoforge:single' || obj['type'] === 'fluid_stack') {
                                    obj['type'] = 'neoforge:tag';
                                }
                                modified = true;
                                console.log(`[Unification Debug] [${recipeId}] Swapping fluid input to tag: ${val} -> ${tag}`);
                            }
                        } else {
                            // OUTPUT: Replace ID with Priority ID
                            let priority = getPriorityFluid(tag);
                            if (priority && priority !== val) {
                                console.log(`[Unification Debug] [${recipeId}] Fixing fluid output '${k}': ${val} -> ${priority}`);
                                obj[k] = priority;
                                modified = true;
                            }
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
                else if (key === 'output' || key === 'outputs' || key === 'results' || key === 'fluidOutputs') childInputContext = false;

                if (deepTraverseAndFix(obj[key], childInputContext, recipeId)) modified = true;
            }
        }
        return modified;
    }

    // 2. DEEP JSON REPLACEMENTS (For complex machine recipes)
    TARGET_MODS.forEach(modid => {
        event.forEachRecipe({ mod: modid }, recipe => {
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
                    // Silent fail
                }
            }
        });
    });

    let duration = Date.now() - startTime;
    console.log(`[Fluid Unification] Completed deep JSON scan in ${duration}ms`);
});
