

ServerEvents.recipes(event => {
    function addAACrusher(input, output, num, bonus) {
        try {
            console.log(`Adding Actually Additions Crusher recipe for input: ${input}, output: ${output}, count: ${num}, bonus chance: ${bonus}`);
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
            console.error(`Failed to add Actually Additions Crusher recipe for input: ${input}. Error: ${err}`);
        }
    }

    //addAACrusher(input, output, num, bonus)

    //Minecraft
    addAACrusher('minecraft:raw_iron', 'oritech:iron_dust', 1, 0.5)
    addAACrusher('minecraft:raw_copper', 'oritech:copper_dust', 1, 0.5)
    addAACrusher('minecraft:raw_gold', 'oritech:gold_dust', 1, 0.5)
    addAACrusher('minecraft:clay', 'minecraft:clay_ball', 4, 0)
    addAACrusher('minecraft:stone', 'minecraft:cobblestone', 1, 0)

    //Silent Gear
    if (Platform.isLoaded('silentgear')) {
        addAACrusher('silentgear:raw_crimson_iron', 'silentgear:crimson_iron_dust', 1, 0.5)
        addAACrusher('silentgear:raw_azure_silver', 'silentgear:azure_silver_dust', 1, 0.5)
        addAACrusher('#c:ores/bort', 'silentgear:bort', 3, 0.5)
    }

    //ATO
    // addAACrusher('#c:ores/sulfur', 'oritech:sulfur_dust', 4, 0.5)
    // addAACrusher('#c:ores/salt', 'oritech:salt_dust', 4, 0.5)

    //Powah
    if (Platform.isLoaded('powah')) {
        addAACrusher('#c:ores/uraninite_poor', 'powah:uraninite_raw', 2, 0)
        addAACrusher('#c:ores/uraninite_regular', 'powah:uraninite_raw', 4, 0)
        addAACrusher('#c:ores/uraninite_dense', 'powah:uraninite_raw', 6, 0)
    }

    addAACrusher('#c:raw_materials/lead', 'create:crushed_raw_lead', 1, 0.5)

    addAACrusher('#c:raw_materials/lithium', 'tfmg:crushed_raw_lithium', 1, 0.5)
    addAACrusher('#c:raw_materials/silver', 'create:crushed_raw_silver', 1, 0.5)
    addAACrusher('#c:raw_materials/zinc', 'create:crushed_raw_zinc', 1, 0.5)
    addAACrusher('#c:raw_materials/aluminum', 'create:crushed_raw_aluminum', 1, 0.5)

    addAACrusher('#c:raw_materials/platinum', 'oritech:platinum_dust', 1, 0.5)
    addAACrusher('#c:raw_materials/uranium', 'create:crushed_raw_uranium', 1, 0.5)

    //Xycraft World
    global.xycraftColours.forEach(colour => {
        addAACrusher(`#c:ores/xychorium_${colour}`, `xycraft_world:xychorium_gem_${colour}`, 4, 0)
    })
})

