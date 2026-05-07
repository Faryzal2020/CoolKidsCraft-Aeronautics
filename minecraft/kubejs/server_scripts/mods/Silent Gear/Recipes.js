

ServerEvents.recipes(event => {
    event.custom(
        {
            "type": "farmingforblockheads:market",
            "category": "farmingforblockheads:seeds",
            "preset": "minecraft:seeds",
            "result": {
                "count": 1,
                "item": "silentgear:fluffy_seeds"
            }
        }
    )

    event.custom(
        {
            "type": "farmingforblockheads:market",
            "category": "farmingforblockheads:seeds",
            "preset": "minecraft:seeds",
            "result": {
                "count": 1,
                "item": "silentgear:flax_seeds"
            }
        }
    )
    //adds a chainmail salvage, mirroring the crafting recipe from MineColonies, which uses vanilla Iron items rather than Modern Industrialization Iron Rings
    //Chainmail Helmet
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "minecraft:chainmail_helmet" },
            "results": [{ "count": 5, "id": "minecraft:iron_nugget" }, { "count": 1, "id": "minecraft:iron_ingot" }]
        }
    )
    //Chainmail Chestplate
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "minecraft:chainmail_chestplate" },
            "results": [{ "count": 6, "id": "minecraft:iron_nugget" }, { "count": 2, "id": "minecraft:iron_ingot" }]
        }
    )
    //Chainmail Leggings
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "minecraft:chainmail_leggings" },
            "results": [{ "count": 4, "id": "minecraft:iron_nugget" }, { "count": 3, "id": "minecraft:iron_ingot" }]
        }
    )
    //Chainmail Boots
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "minecraft:chainmail_boots" },
            "results": [{ "count": 2, "id": "minecraft:iron_nugget" }, { "count": 2, "id": "minecraft:iron_ingot" }]
        }
    )
    //Adds Pneumaticraft's Compressed Iron Armor to the Salvager
    //Compressed Iron Helmet
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "pneumaticcraft:compressed_iron_helmet" },
            "results": [{ "count": 5, "id": "minecraft:leather" }, { "count": 5, "id": "pneumaticcraft:ingot_iron_compressed" }]
        }
    )
    //Compressed Iron Chestplate
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "pneumaticcraft:compressed_iron_chestplate" },
            "results": [{ "count": 8, "id": "minecraft:leather" }, { "count": 8, "id": "pneumaticcraft:ingot_iron_compressed" }]
        }
    )
    //Compressed Iron Leggings
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "pneumaticcraft:compressed_iron_leggings" },
            "results": [{ "count": 7, "id": "minecraft:leather" }, { "count": 7, "id": "pneumaticcraft:ingot_iron_compressed" }]
        }
    )
    //Compressed Iron Boots
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "pneumaticcraft:compressed_iron_boots" },
            "results": [{ "count": 4, "id": "minecraft:leather" }, { "count": 4, "id": "pneumaticcraft:ingot_iron_compressed" }]
        }
    )
    //adds Everything is Copper gear to the Salvager
    //Copper Pickaxe
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": {
                "item": "everythingcopper:copper_pickaxe"
            },
            "results": [
                {
                    "count": 3,
                    "id": "minecraft:copper_ingot"
                },
                {
                    "count": 2,
                    "id": "minecraft:stick"
                }
            ]
        }
    )
    //Copper Horse Armor
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "everythingcopper:copper_horse_armor" },
            "results": [{ "count": 6, "id": "minecraft:copper_ingot" }, { "count": 1, "id": "minecraft:leather" }]
        }
    )
    //Copper Sword
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "everythingcopper:copper_sword" },
            "results": [{ "count": 2, "id": "minecraft:copper_ingot" }, { "count": 1, "id": "minecraft:stick" }]
        }
    )
    //Copper Axe
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "everythingcopper:copper_axe" },
            "results": [{ "count": 3, "id": "minecraft:copper_ingot" }, { "count": 2, "id": "minecraft:stick" }]
        }
    )
    //Copper Helmet
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "everythingcopper:copper_helmet" },
            "results": [{ "count": 5, "id": "minecraft:copper_ingot" }]
        }
    )
    //Copper Chestplate
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "everythingcopper:copper_chestplate" },
            "results": [{ "count": 8, "id": "minecraft:copper_ingot" }]
        }
    )
    //Copper Leggings
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "everythingcopper:copper_leggings" },
            "results": [{ "count": 7, "id": "minecraft:copper_ingot" }]
        }
    )
    //Copper Boots
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "everythingcopper:copper_boots" },
            "results": [{ "count": 4, "id": "minecraft:copper_ingot" }]
        }
    )
    //Copper Hoe
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "everythingcopper:copper_hoe" },
            "results": [{ "count": 2, "id": "minecraft:copper_ingot" }, { "count": 2, "id": "minecraft:stick" }]
        }
    )
    //Copper Shovel
    event.custom(
        {
            "type": "silentgear:salvaging",
            "ingredient": { "item": "everythingcopper:copper_shovel" },
            "results": [{ "count": 1, "id": "minecraft:copper_ingot" }, { "count": 2, "id": "minecraft:stick" }]
        }
    )
})


