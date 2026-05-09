ServerEvents.recipes(event => {
    /**
     * Helper for TFMG Vat Machine Recipe
     * @param {Array} ingredients - Array of ingredient strings or objects (e.g. ['3x #c:dusts/sulfur', '1000x minecraft:water'])
     * @param {Array} results - Array of result strings or objects (e.g. ['500x tfmg:sulfuric_acid'])
     * @param {string} recipeName - Unique recipe name
     * @param {Object} options - Optional parameters (allowed_vat_types, processing_time, etc.)
     */
    function tfmg_vat(ingredients, results, recipeName, options) {
        let processedIngredients = ingredients.map(ing => {
            if (typeof ing === 'string') {
                // Handle fluids (e.g. '1000x minecraft:water')
                if (ing.includes('x ')) {
                    let amount = Math.floor(parseInt(parts[0]));
                    let id = parts[1];
                    if (Fluid.exists(id)) {
                        return { type: "neoforge:single", amount: amount, fluid: id };
                    }
                    if (id.startsWith('#')) {
                        return { type: "neoforge:tag", amount: amount, tag: id.substring(1) };
                    }
                    return { count: amount, item: id };
                }
                // Handle tags/items
                if (ing.startsWith('#')) return { tag: ing.substring(1) };
                return { item: ing };
            }
            return ing;
        });

        let processedResults = results.map(res => {
            if (typeof res === 'string') {
                if (res.includes('x ')) {
                    let parts = res.split('x ');
                    let amount = parseInt(parts[0]);
                    let id = parts[1];
                    // TFMG uses 'id' + 'amount' for fluids in results
                    return { amount: amount, id: id };
                }
                return { id: res };
            }
            return res;
        });

        let recipe = {
            type: "tfmg:vat_machine_recipe",
            ingredients: processedIngredients,
            results: processedResults
        };

        if (options) Object.assign(recipe, options);

        console.log("[TFMG Recipe] Creating kubejs:tfmg/vat_machine/" + recipeName)
        console.log("[TFMG Recipe] Ingredients: " + JSON.stringify(processedIngredients))
        console.log("[TFMG Recipe] Results: " + JSON.stringify(processedResults))
        event.custom(recipe).id(`kubejs:tfmg/vat_machine/${recipeName}`);
    }

    /**
     * Helper for TFMG Industrial Blasting Recipe
     * @param {Array} ingredients - Array of ingredient strings or objects
     * @param {Array} results - Array of result strings or objects
     * @param {string} recipeName - Unique recipe name
     * @param {number} hotAirUsage - Hot air consumed per tick
     * @param {number} time - Processing time in ticks
     */
    function tfmg_blasting(ingredients, results, recipeName, hotAirUsage, time) {
        let processedIngredients = ingredients.map(ing => {
            if (typeof ing === 'string') {
                if (ing.startsWith('#')) return { tag: ing.substring(1) };
                return { item: ing };
            }
            return ing;
        });

        let processedResults = results.map(res => {
            if (typeof res === 'string') {
                if (res.includes('x ')) {
                    let parts = res.split('x ');
                    let amount = Math.floor(parseInt(parts[0]));
                    let id = parts[1];
                    return { amount: amount, id: id };
                }
                return { id: res };
            }
            return res;
        });
        console.log("[TFMG Recipe] Creating kubejs:tfmg/industrial_blasting/" + recipeName)
        console.log("[TFMG Recipe] Ingredients: " + JSON.stringify(processedIngredients))
        console.log("[TFMG Recipe] Results: " + JSON.stringify(processedResults))
        event.custom({
            type: "tfmg:industrial_blasting",
            hot_air_usage: hotAirUsage || 20,
            ingredients: processedIngredients,
            processing_time: time || 20,
            results: processedResults
        }).id(`kubejs:tfmg/industrial_blasting/${recipeName}`);
    }

    // --- Examples ---
    // tfmg_vat(['3x tfmg:sulfur_dust', '1000x minecraft:water'], ['500x tfmg:sulfuric_acid'], 'sulfuric_acid', { allowed_vat_types: ["tfmg:steel_vat"] })
    // tfmg_blasting(['#c:/iron', '#tfmg:flux'], ['x productivemetalworks:molten_steel', 'x tfmg:molten_slag', 'x tfmg:furnace_gas'], 'steel_from_', 40, )

    tfmg_blasting(['#c:raw_materials/iron', '#tfmg:flux'], ['180x productivemetalworks:molten_steel', '144x tfmg:molten_slag', '180x tfmg:furnace_gas'], 'steel_from_raw', 40, 40)
    tfmg_blasting(['#c:storage_blocks/raw_iron', '#tfmg:flux'], ['1620x productivemetalworks:molten_steel', '1296x tfmg:molten_slag', '1620x tfmg:furnace_gas'], 'steel_from_raw_block', 40, 320)
    tfmg_blasting(['#c:dusts/iron', '#tfmg:flux'], ['180x productivemetalworks:molten_steel', '144x tfmg:molten_slag', '180x tfmg:furnace_gas'], 'steel_from_dust', 40, 40)
    tfmg_blasting(['#c:ingots/iron', '#tfmg:flux'], ['180x productivemetalworks:molten_steel', '144x tfmg:molten_slag', '180x tfmg:furnace_gas'], 'steel_from_ingot', 40, 40)
    tfmg_blasting(['#c:plates/iron', '#tfmg:flux'], ['180x productivemetalworks:molten_steel', '144x tfmg:molten_slag', '180x tfmg:furnace_gas'], 'steel_from_plate', 40, 40)
    tfmg_blasting(['#c:storage_blocks/iron', '#tfmg:flux'], ['1620x productivemetalworks:molten_steel', '1296x tfmg:molten_slag', '1620x tfmg:furnace_gas'], 'steel_from_block', 40, 320)
    tfmg_blasting(['#c:nuggets/iron', '#tfmg:flux'], ['20x productivemetalworks:molten_steel', '16x tfmg:molten_slag', '20x tfmg:furnace_gas'], 'steel_from_nuggets', 40, 20)
    tfmg_blasting(['#c:ores/iron', '#tfmg:flux'], ['220x productivemetalworks:molten_steel', '180x tfmg:molten_slag', '180x tfmg:furnace_gas'], 'steel_from_ores', 40, 40)
    tfmg_blasting(['#c:clumps/iron', '#tfmg:flux'], ['180x productivemetalworks:molten_steel', '144x tfmg:molten_slag', '180x tfmg:furnace_gas'], 'steel_from_clumps', 40, 40)

    tfmg_blasting(['#c:ingots/steel', 'minecraft:netherite_scrap'], ['240x createbigcannons:molten_nethersteel', '180x tfmg:molten_slag', '320x tfmg:furnace_gas'], 'nethersteel_from_ingot', 160, 80)


    // Silicon Unification
    event.remove({ output: 'tfmg:silicon_ingot' })
    event.remove({ output: 'tfmg:liquid_silicon_bucket' })
    event.remove({ id: 'tfmg:industrial_blasting/silicon' })
    event.remove({ id: 'tfmg:casting/silicon' })
})
