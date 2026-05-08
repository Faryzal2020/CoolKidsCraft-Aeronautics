// priority: 99

ServerEvents.tags('item', event => {
    // Fix tfmg:plastic_sheet tags
    event.removeAllTagsFrom('tfmg:plastic_sheet');
    event.add('c:plates/plastic', 'tfmg:plastic_sheet');
    event.add('c:plastics', 'tfmg:plastic_sheet');
    event.add('pneumaticcraft:plastic_sheets', 'tfmg:plastic_sheet');

    // Fix pneumaticcraft:plastic tags
    event.add('c:plates/plastic', 'pneumaticcraft:plastic');

    // Ensure all target plastic sheets have the unified tag
    event.add('c:plates/plastic', 'oritech:plastic_sheet');
});

ServerEvents.tags('fluid', event => {
    // Unify molten plastic fluids
    event.add('c:molten_plastic', ['pneumaticcraft:plastic', 'tfmg:molten_plastic']);
});

ServerEvents.recipes(event => {
    const modsToScan = [
        'oritech', 'pneumaticcraft', 'tfmg', 'create', 'enderio', 'actuallyadditions',
        'productivemetalworks', 'productivebees'
    ];

    const moltenPlasticFluids = ['pneumaticcraft:plastic', 'tfmg:molten_plastic'];
    const moltenPlasticTag = 'c:molten_plastic';
    const moltenPlasticOutput = 'pneumaticcraft:plastic';

    const plasticSheetItems = ['oritech:plastic_sheet', 'pneumaticcraft:plastic', 'tfmg:plastic_sheet'];
    const plasticSheetTag = 'c:plates/plastic';
    const plasticSheetOutput = 'oritech:plastic_sheet';

    const inputKeys = new Set(['input', 'inputs', 'ingredients', 'ingredient', 'key', 'base', 'addition']);

    modsToScan.forEach(mod => {
        event.forEachRecipe({ mod: mod }, recipe => {
            let json = recipe.json;
            if (!json || !json.isJsonObject()) return;

            let recipeId = recipe.getId();
            let rootObj = JSON.parse(json.toString());
            let modified = false;
            let loggedModifying = false;

            function logChange(isInput, beforeVal, afterVal) {
                if (!loggedModifying) {
                    console.log(`modifying ${recipeId}`);
                    loggedModifying = true;
                }
                let contextStr = isInput ? 'input' : 'output';
                console.log(`match ${contextStr} item: ${beforeVal}`);
                console.log(`replacing ${beforeVal} (before) to ${afterVal} (after) for recipe ${recipeId}`);
                modified = true;
            }

            function deepTraverse(obj, isInputContext) {
                if (Array.isArray(obj)) {
                    for (let i = 0; i < obj.length; i++) {
                        if (typeof obj[i] === 'string') {
                            let val = obj[i];
                            if (isInputContext) {
                                // pneumaticcraft:plastic is ambiguous as string without keys, but usually means item in string arrays
                                if (val === 'pneumaticcraft:plastic') {
                                    obj[i] = '#' + plasticSheetTag;
                                    logChange(true, val, obj[i]);
                                } else if (moltenPlasticFluids.includes(val) || val === moltenPlasticTag) {
                                    obj[i] = '#' + moltenPlasticTag;
                                    logChange(true, val, obj[i]);
                                } else if (plasticSheetItems.includes(val) || val === plasticSheetTag) {
                                    obj[i] = '#' + plasticSheetTag;
                                    logChange(true, val, obj[i]);
                                }
                            } else {
                                if (val === 'pneumaticcraft:plastic') {
                                    if (val !== plasticSheetOutput) {
                                        obj[i] = plasticSheetOutput;
                                        logChange(false, val, obj[i]);
                                    }
                                } else if (moltenPlasticFluids.includes(val) || val === '#' + moltenPlasticTag || val === moltenPlasticTag) {
                                    if (val !== moltenPlasticOutput) {
                                        obj[i] = moltenPlasticOutput;
                                        logChange(false, val, obj[i]);
                                    }
                                } else if (plasticSheetItems.includes(val) || val === '#' + plasticSheetTag || val === plasticSheetTag) {
                                    if (val !== plasticSheetOutput) {
                                        obj[i] = plasticSheetOutput;
                                        logChange(false, val, obj[i]);
                                    }
                                }
                            }
                        } else if (typeof obj[i] === 'object' && obj[i] !== null) {
                            deepTraverse(obj[i], isInputContext);
                        }
                    }
                } else if (typeof obj === 'object' && obj !== null) {
                    if (isInputContext) {
                        // Cleanup if it's already a tag but has lingering specific keys
                        if (obj.tag === moltenPlasticTag || obj.tag === '#' + moltenPlasticTag) {
                            if (obj.tag === '#' + moltenPlasticTag) {
                                obj.tag = moltenPlasticTag;
                                logChange(true, '#' + moltenPlasticTag, moltenPlasticTag);
                            }
                            obj.fluidTag = moltenPlasticTag;
                            obj.fluid_tag = moltenPlasticTag;
                            if (obj.type && (obj.type === 'neoforge:single' || obj.type.includes('item') || obj.type.includes('fluid'))) delete obj.type;
                            if (obj.item) { logChange(true, obj.item, 'deleted'); delete obj.item; }
                            if (obj.id) { logChange(true, obj.id, 'deleted'); delete obj.id; }
                        } else if (obj.tag === plasticSheetTag || obj.tag === '#' + plasticSheetTag) {
                            if (obj.tag === '#' + plasticSheetTag) {
                                obj.tag = plasticSheetTag;
                                logChange(true, '#' + plasticSheetTag, plasticSheetTag);
                            }
                            if (obj.type && (obj.type === 'neoforge:single' || obj.type.includes('item') || obj.type.includes('fluid'))) delete obj.type;
                            if (obj.item) { logChange(true, obj.item, 'deleted'); delete obj.item; }
                            if (obj.id) { logChange(true, obj.id, 'deleted'); delete obj.id; }
                        }

                        // Replace direct IDs with tags
                        for (let k of ['item', 'id', 'fluid', 'fluid_id']) {
                            if (obj[k]) {
                                let val = obj[k];
                                if (val === 'pneumaticcraft:plastic') {
                                    // Disambiguate item vs fluid
                                    let isFluid = (k === 'fluid' || k === 'fluid_id' || obj.amount !== undefined);
                                    delete obj[k];
                                    if (isFluid) {
                                        obj.tag = moltenPlasticTag;
                                        obj.fluidTag = moltenPlasticTag;
                                        obj.fluid_tag = moltenPlasticTag;
                                        if (obj.type && (obj.type === 'neoforge:single' || obj.type.includes('item') || obj.type.includes('fluid'))) delete obj.type;
                                        logChange(true, val, moltenPlasticTag);
                                    } else {
                                        obj.tag = plasticSheetTag;
                                        if (obj.type && (obj.type === 'neoforge:single' || obj.type.includes('fluid') || obj.type.includes('item'))) delete obj.type;
                                        logChange(true, val, plasticSheetTag);
                                    }
                                } else if (moltenPlasticFluids.includes(val) || val === '#' + moltenPlasticTag) {
                                    delete obj[k];
                                    obj.tag = moltenPlasticTag;
                                    obj.fluidTag = moltenPlasticTag;
                                    obj.fluid_tag = moltenPlasticTag;
                                    if (obj.type && (obj.type === 'neoforge:single' || obj.type.includes('item') || obj.type.includes('fluid'))) delete obj.type;
                                    logChange(true, val, moltenPlasticTag);
                                } else if (plasticSheetItems.includes(val) || val === '#' + plasticSheetTag) {
                                    delete obj[k];
                                    obj.tag = plasticSheetTag;
                                    if (obj.type && (obj.type === 'neoforge:single' || obj.type.includes('fluid') || obj.type.includes('item'))) delete obj.type;
                                    logChange(true, val, plasticSheetTag);
                                }
                            }
                        }
                    } else {
                        // Output context: replace tags with specific output items
                        if (obj.tag === moltenPlasticTag || obj.tag === '#' + moltenPlasticTag) {
                            let oldVal = obj.tag;
                            delete obj.tag;
                            if (obj.amount !== undefined) obj.fluid = moltenPlasticOutput;
                            else obj.id = moltenPlasticOutput;
                            logChange(false, oldVal, moltenPlasticOutput);
                        } else if (obj.tag === plasticSheetTag || obj.tag === '#' + plasticSheetTag) {
                            let oldVal = obj.tag;
                            delete obj.tag;
                            if (obj.count !== undefined) obj.item = plasticSheetOutput;
                            else obj.id = plasticSheetOutput;
                            logChange(false, oldVal, plasticSheetOutput);
                        }

                        // Replace other variants with the unified output
                        for (let k of ['item', 'id', 'fluid', 'fluid_id']) {
                            if (obj[k]) {
                                let val = obj[k];
                                if (val === 'pneumaticcraft:plastic') {
                                    let isFluid = (k === 'fluid' || k === 'fluid_id' || obj.amount !== undefined);
                                    if (isFluid) {
                                        if (val !== moltenPlasticOutput) {
                                            obj[k] = moltenPlasticOutput;
                                            logChange(false, val, moltenPlasticOutput);
                                        }
                                    } else {
                                        if (val !== plasticSheetOutput) {
                                            obj[k] = plasticSheetOutput;
                                            logChange(false, val, plasticSheetOutput);
                                        }
                                    }
                                } else if (moltenPlasticFluids.includes(val) && val !== moltenPlasticOutput) {
                                    obj[k] = moltenPlasticOutput;
                                    logChange(false, val, moltenPlasticOutput);
                                } else if (plasticSheetItems.includes(val) && val !== plasticSheetOutput) {
                                    obj[k] = plasticSheetOutput;
                                    logChange(false, val, plasticSheetOutput);
                                }
                            }
                        }
                    }

                    // Recurse deeper into nested structures
                    for (let key in obj) {
                        let childContext = isInputContext;
                        if (childContext === null) {
                            if (inputKeys.has(key)) childContext = true;
                            else childContext = false;
                        }
                        deepTraverse(obj[key], childContext);
                    }
                }
            }

            // Start traversal from root
            for (let key in rootObj) {
                let context = inputKeys.has(key) ? true : false;
                deepTraverse(rootObj[key], context);
            }

            if (modified) {
                // We've already logged modifying above, but keep this one as a completion marker if desired, though we'll omit it so it matches requested structure exactly.
                event.remove({ id: recipeId });
                event.custom(rootObj).id(recipeId);
            }
        });
    });

    event.remove({ id: "create:empty_tfmg_molten_plastic_bucket_of_tfmg_molten_plastic" })
    event.remove({ id: "create:fill_minecraft_bucket_with_tfmg_molten_plastic" })

    const modsToClean = ['oritech', 'tfmg', 'create', 'pneumaticcraft', 'enderio', 'productivemetalworks'];
    const plasticSheetOutputs = ['oritech:plastic_sheet', 'tfmg:plastic_sheet', 'pneumaticcraft:plastic'];
    const inputKeysToSkipForRemoval = new Set(['input', 'inputs', 'ingredients', 'ingredient', 'key', 'base', 'addition']);

    modsToClean.forEach(modid => {
        event.forEachRecipe({ mod: modid }, recipe => {
            let json = recipe.json;
            if (!json || !json.isJsonObject()) return;

            let recipeId = recipe.getId();
            let rootObj = JSON.parse(json.toString());
            let shouldRemove = false;

            function searchForOutput(obj) {
                if (shouldRemove) return;

                if (Array.isArray(obj)) {
                    for (let i = 0; i < obj.length; i++) {
                        if (typeof obj[i] === 'string' && plasticSheetOutputs.includes(obj[i])) {
                            if (obj[i] === 'pneumaticcraft:plastic') {
                                shouldRemove = true;
                            } else {
                                shouldRemove = true;
                            }
                            if (shouldRemove) return;
                        } else if (typeof obj[i] === 'object' && obj[i] !== null) {
                            searchForOutput(obj[i]);
                        }
                    }
                } else if (typeof obj === 'object' && obj !== null) {
                    for (let k of ['output', 'item', 'id']) {
                        if (obj[k] && typeof obj[k] === 'string' && plasticSheetOutputs.includes(obj[k])) {
                            if (obj[k] === 'pneumaticcraft:plastic') {
                                let isFluid = (obj.amount !== undefined || obj.fluid !== undefined || obj.fluid_id !== undefined || obj.type === 'neoforge:fluid' || obj.type === 'pneumaticcraft:fluid');
                                if (!isFluid) {
                                    shouldRemove = true;
                                    return;
                                }
                            } else {
                                shouldRemove = true;
                                return;
                            }
                        }
                    }

                    for (let key in obj) {
                        if (inputKeysToSkipForRemoval.has(key)) continue;
                        searchForOutput(obj[key]);
                        if (shouldRemove) return;
                    }
                }
            }

            for (let key in rootObj) {
                if (inputKeysToSkipForRemoval.has(key)) continue;
                searchForOutput(rootObj[key]);
                if (shouldRemove) break;
            }

            if (shouldRemove) {
                console.log(`[Plastic Fix] Removing recipe via deep search: ${recipeId}`);
                event.remove({ id: recipeId });
            }
        });
    });

    event.recipes.createCompacting('oritech:plastic_sheet', { fluidTag: 'c:molten_plastic', amount: 90 });
    event.recipes.createCutting('oritech:plastic_sheet', 'c:storage_blocks/plastic').processingTime(60);
});
