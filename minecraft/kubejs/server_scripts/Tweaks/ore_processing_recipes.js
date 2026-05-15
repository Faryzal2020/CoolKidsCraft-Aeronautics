

ServerEvents.recipes(event => {
    function addAACrusher(input, output, num, bonus) {
        try {
            console.log(`[Ore Processing] Adding Actually Additions Crusher recipe for input: ${input}, output: ${output}, count: ${num}, bonus chance: ${bonus}`);
            if (bonus !== 0) {
                event.recipes.actuallyadditions.crushing(
                    [Item.of(output, num), CrushingResult.of(output, bonus)],
                    input
                )
            }
            else {
                event.recipes.actuallyadditions.crushing(
                    Item.of(output, num),
                    input
                )
            }
        } catch (err) {
            console.error(`[Ore Processing] Failed to add Actually Additions Crusher recipe for input: ${input}. Error: ${err}`);
        }
    }
    function sagMill(input, energy, output) {
        event.custom(
            {
                type: 'enderio:sag_milling',
                energy: energy,
                input: Ingredient.of(input).toJson(),
                outputs: [
                    {
                        item: {
                            count: output.count,
                            id: output.item
                        }
                    }
                ]
            }
        )
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

    //sagMill(input, energy, output{item, count})
    //addAACrusher(input, output, num, bonus)

    sagMill('railcraft:tin_ingot', 1000, { item: 'enderio:powdered_tin', count: 1 })
    addAACrusher('railcraft:tin_ingot', 'enderio:powdered_tin', 1, 0)
    event.recipes.oritech.pulverizer()
        .itemInputs('railcraft:tin_ingot')
        .itemOutputs('enderio:powdered_tin')
        .time(100)
        .id(`kubejs:pulverizer/dusts/tin_ingot_to_dust`)
    event.recipes.oritech.grinder()
        .itemInputs('railcraft:tin_ingot')
        .itemOutputs('enderio:powdered_tin')
        .time(40)
        .id(`kubejs:grinder/dusts/tin_ingot_to_dust`)

    const ores = [
        { input: '#c:ores/dimensional_shard', output: 'rftoolsbase:dimensionalshard', process: [1, 1, 1, 1, 1] },
        { input: '#c:ores/sulfur', output: 'tfmg:sulfur_dust', process: [1, 1, 1, 1, 1] },
        { input: '#c:ores/platinum', output: 'oritech:platinum_clump', process: [1, 0, 1, 0, 0] },
        { input: '#c:ores/silver', output: 'create:crushed_raw_silver', process: [1, 0, 1, 1, 1] },
        { input: '#c:ores/zinc', output: 'create:crushed_raw_zinc', process: [1, 0, 1, 0, 0] },
        { input: '#c:ores/tin', output: 'create:crushed_raw_tin', process: [1, 0, 1, 1, 1] },
        { input: '#c:ores/benitoite', output: 'bigreactors:benitoite_crystal', process: [1, 1, 1, 1, 1] },
        { input: '#c:ores/anglesite', output: 'bigreactors:anglesite_crystal', process: [1, 1, 1, 1, 1] },
        { input: '#c:ores/aluminum', output: 'create:crushed_raw_aluminum', process: [1, 0, 1, 1, 1] },
        { input: '#c:ores/lithium', output: 'tfmg:crushed_raw_lithium', process: [1, 0, 1, 1, 1] },
        { input: '#c:ores/lead', output: 'create:crushed_raw_lead', process: [1, 0, 1, 1, 1] },
        { input: '#c:ores/nickel', output: 'create:crushed_raw_nickel', process: [1, 0, 1, 0, 0] },
        { input: '#c:ores/saltpeter', output: 'tfmg:nitrate_dust', process: [1, 1, 1, 1, 1] }
    ]

    const melting = [

    ]

    // Dimensional Shard
    ores.forEach(ore => {

        // 1. Additional Additions Crusher
        if (ore.process[0] == 1) {
            addAACrusher(ore.input, ore.output, 1, 0.5)
        }

        // 2. Create Crusher
        if (ore.process[1] == 1) {
            let output = '2x ' + ore.output
            let input = Ingredient.of(ore.input)
            event.recipes.createCrushing([
                output,
                CreateItem.of(ore.output, 0.5)
            ], input).processingTime(200).id("kubejs:create/ore_blocks/crushing_" + ore.input.replace('#c:', ''));
            // using KubeJS Create api , check docs folder for documentation
        }

        // 3. EnderIO Sag Mill
        if (ore.process[2] == 1) {
            event.recipes.enderio.sag_milling(
                [Ingredient.of(ore.output, 2), SagMillOutput.of(ore.output, 0.5)],
                ore.input,
                2400,
                SagMillBonus.NONE
            ) // using KubeJS EnderIO api , check docs folder for documentation
        }

        // 4. OriTech Pulverizer
        if (ore.process[3] == 1) {
            event.recipes.oritech.pulverizer()
                .itemInputs(ore.input)
                .itemOutputs(`2x ${ore.output}`)
                .time(100)
                .id(`kubejs:pulverizer/ore_blocks/${ore.input.replace('#c:', '')}`)
        }

        // 5. OriTech Grinder
        if (ore.process[4] == 1) {
            event.recipes.oritech.grinder()
                .itemInputs(ore.input)
                .itemOutputs(`3x ${ore.output}`)
                .time(40)
                .id(`kubejs:grinder/ore_blocks/${ore.input.replace('#c:', '')}`)
        }
    })
})

