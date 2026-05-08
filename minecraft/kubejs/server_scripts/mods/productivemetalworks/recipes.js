
ServerEvents.recipes(event => {
    /**
     * Helper for Productive Metalworks Block Casting (no cast)
     * @param {string} fluid - Fluid ID or Tag (e.g. 'c:molten_lead')
     * @param {string} result - Output item ID
     * @param {string} id - Unique recipe ID suffix
     */
    function pmw_block_casting(fluid, result, id) {
        let fluidCfg = { amount: 810 };
        if (fluid.startsWith('#')) {
            fluidCfg.tag = fluid.substring(1);
        } else if (fluid.startsWith('c:')) {
            fluidCfg.tag = fluid;
        } else {
            fluidCfg.fluid = fluid;
        }

        event.custom({
            type: "productivemetalworks:block_casting",
            fluid: fluidCfg,
            result: {
                count: 1,
                id: result
            }
        }).id(`kubejs:productivemetalworks/casting/block/${id}`)
    }

    /**
     * Helper for Productive Metalworks Item Casting (with cast)
     * @param {string} cast - Cast item ID
     * @param {number} amount - Fluid amount
     * @param {string} fluid - Fluid ID or Tag
     * @param {string} result - Output item ID
     * @param {string} id - Unique recipe ID suffix
     * @param {string} folder - Subfolder for recipe ID
     */
    function pmw_item_casting(cast, amount, fluid, result, id, folder) {
        let fluidCfg = { amount: amount };
        if (fluid.startsWith('#')) {
            fluidCfg.tag = fluid.substring(1);
        } else if (fluid.startsWith('c:')) {
            fluidCfg.tag = fluid;
        } else {
            fluidCfg.fluid = fluid;
        }

        event.custom({
            type: "productivemetalworks:item_casting",
            cast: {
                item: cast
            },
            consume_cast: false,
            fluid: fluidCfg,
            result: {
                count: 1,
                id: result
            }
        }).id(`kubejs:productivemetalworks/casting/${folder}/${id}`)
    }

    // Specific helpers for different cast types
    function pmw_ingot_casting(fluid, result, id) {
        pmw_item_casting('productivemetalworks:ingot_cast', 90, fluid, result, id, 'ingots')
    }

    function pmw_nugget_casting(fluid, result, id) {
        pmw_item_casting('productivemetalworks:nugget_cast', 10, fluid, result, id, 'nuggets')
    }

    function pmw_plate_casting(fluid, result, id) {
        pmw_item_casting('productivemetalworks:plate_cast', 90, fluid, result, id, 'plates')
    }

    /**
     * Helper for Productive Metalworks Item Melting
     * @param {string} ingredient - Item ID or Tag (e.g. 'minecraft:iron_ingot' or '#c:ingots/iron')
     * @param {string} resultFluid - Output fluid ID
     * @param {number} amount - Output fluid amount in mB
     * @param {number} minTemp - Minimum temperature required
     * @param {string} id - Unique recipe ID suffix
     */
    function pmw_item_melting(ingredient, resultFluid, amount, minTemp, id) {
        let ingCfg = {};
        if (ingredient.startsWith('#')) {
            ingCfg.tag = ingredient.substring(1);
        } else if (ingredient.startsWith('c:')) {
            ingCfg.tag = ingredient;
        } else {
            ingCfg.item = ingredient;
        }

        event.custom({
            type: "productivemetalworks:item_melting",
            ingredient: ingCfg,
            maximum_temperature: 0,
            minimum_temperature: minTemp,
            result: [
                {
                    amount: amount,
                    id: resultFluid
                }
            ]
        }).id(`kubejs:productivemetalworks/melting/${id}`)
    }


    // --- EXAMPLES ---
    // pmw_block_casting('c:molten_lead', 'railcraft:lead_block', 'lead')
    // pmw_ingot_casting('c:molten_lead', 'tfmg:lead_ingot', 'lead')
    // pmw_nugget_casting('c:molten_lead', 'railcraft:lead_nugget', 'lead')
    // pmw_plate_casting('c:molten_lead', 'railcraft:lead_plate', 'lead')
    // pmw_item_melting('#c:ingots/lead', 'productivemetalworks:molten_lead', 90, 1000, 'lead')

    pmw_item_melting('#c:storage_blocks/plastic', 'pneumaticcraft:plastic', 810, 500, 'plastic')

    pmw_block_casting('c:molten_lead', 'tfmg:lead_block', 'lead')
    pmw_nugget_casting('c:molten_lead', 'tfmg:lead_nugget', 'lead')
    pmw_plate_casting('c:molten_lead', 'tfmg:lead_sheet', 'lead')

    pmw_block_casting('c:molten_silver', 'railcraft:silver_block', 'silver')
    pmw_ingot_casting('c:molten_silver', 'railcraft:silver_ingot', 'silver')
    pmw_nugget_casting('c:molten_silver', 'railcraft:silver_nugget', 'silver')
    pmw_plate_casting('c:molten_silver', 'railcraft:silver_plate', 'silver')

    pmw_plate_casting('c:molten_nickel', 'tfmg:nickel_sheet', 'nickel')
    pmw_plate_casting('c:molten_zinc', 'railcraft:zinc_plate', 'zinc')
    pmw_plate_casting('c:molten_tin', 'railcraft:tin_plate', 'tin')
    pmw_plate_casting('c:molten_invar', 'railcraft:invar_plate', 'invar')
    pmw_plate_casting('c:molten_bronze', 'railcraft:bronze_plate', 'bronze')

    pmw_block_casting('c:molten_aluminum', 'tfmg:aluminum_block', 'aluminum')
    pmw_ingot_casting('c:molten_aluminum', 'tfmg:aluminum_ingot', 'aluminum')
    pmw_nugget_casting('c:molten_aluminum', 'tfmg:aluminum_nugget', 'aluminum')
    pmw_plate_casting('c:molten_aluminum', 'tfmg:aluminum_sheet', 'aluminum')

    pmw_block_casting('c:molten_plastic', 'oritech:plastic_block', 'plastic')
    pmw_plate_casting('c:molten_plastic', 'oritech:plastic_sheet', 'plastic')
})
