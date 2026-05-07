

ServerEvents.recipes(event => {
    function addAACrusher(input, output, num, bonus) {
        if (bonus !== 0) {
            event.custom(
                {
                    type: 'actuallyadditions:crushing',
                    ingredient: Ingredient.of(input).toJson(),
                    result: [
                        {
                            result: {
                                count: num,
                                id: output
                            }
                        },
                        {
                            chance: bonus,
                            result: {
                                count: 1,
                                id: output
                            }
                        }
                    ]
                }
            )
        }
        else {
            event.custom(
                {
                    type: 'actuallyadditions:crushing',
                    ingredient: Ingredient.of(input).toJson(),
                    result: [
                        {
                            result: {
                                count: num,
                                id: output
                            }
                        },
                        {
                            chance: bonus,
                            result: {}
                        }
                    ]
                }
            )
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


    //Xycraft World
    global.xycraftColours.forEach(colour => {
        addAACrusher(`#c:ores/xychorium_${colour}`, `xycraft_world:xychorium_gem_${colour}`, 4, 0)
    })
})

