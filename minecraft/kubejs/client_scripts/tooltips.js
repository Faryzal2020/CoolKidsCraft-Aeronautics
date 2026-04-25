

ItemEvents.modifyTooltips(allthemods => {

    //AllTheModium

    allthemods.add(['allthemodium:allthemodium_ore', 'allthemodium:allthemodium_slate_ore'], [
        Text.of('§7Needs at least Netherite to be mined'),
        Text.of('§6Found in the Deep Dark Biome and will always spawn air exposed'),
        Text.of('§6Also found in the Deep Slate Layer of Mining Dimension')
    ])
    allthemods.add(['allthemodium:vibranium_ore', 'allthemodium:other_vibranium_ore'], [
        Text.of('§7Needs at least AllTheModium to be mined'),
        Text.of('§bFound in any Nether biome'),
        Text.of('§bAlso found in The Other')
    ])
    allthemods.add('allthemodium:unobtainium_ore', [
        Text.of('§7Needs at least Vibranium to be mined'),
        Text.of('§dFound in the End Highlands')
    ])

    allthemods.add('kubejs:silent_allthemodium_plate', [
        Text.of("§7§oIt's less... talkative now")
    ])
    allthemods.add('kubejs:silent_vibranium_plate', [
        Text.of("§7§oIt's less... talkative now")
    ])
    allthemods.add('kubejs:silent_unobtainium_plate', [
        Text.of("§7§oIt's less... talkative now")
    ])

    allthemods.add('allthemodium:allthemodium_ingot', [
        Text.of("§7§oThese arent the ingots you are looking for"),
        Text.of("§6Look for the [Silent Allthemodium Plate]")
    ])
    allthemods.add('allthemodium:vibranium_ingot', [
        Text.of("§7§oThese arent the ingots you are looking for"),
        Text.of("§6Look for the [Silent Vibranium Plate]")
    ])
    allthemods.add('allthemodium:unobtainium_ingot', [
        Text.of("§7§oThese arent the ingots you are looking for"),
        Text.of("§6Look for the [Silent Unobtainium Plate]")
    ])


    allthemods.add('allthemodium:allthemodium_upgrade_smithing_template', [
        Text.of('§6Found in Suspicious Clay in Ancient Cities')
    ])
    allthemods.add('allthemodium:vibranium_upgrade_smithing_template', [
        Text.of('§bFound in Suspicious Soul Sand in Bastions')
    ])
    allthemods.add('allthemodium:unobtainium_upgrade_smithing_template', [
        Text.of('§dDropped by the Trial Spawner in the Library of the Dungeon within The Other')
    ])



    //Mystical Agriculture
    if (Platform.isLoaded('mysticalagriculture')) {
        allthemods.add(/mysticalagriculture:.*watering_can/, [
            Text.of("§cDisabled for Fake Player"),
            Text.of("§c(Blocks like Modular Routers, Clickers, etc)")
        ])
    }

    allthemods.add('toolbelt:belt', [
        Text.of("§7Has it's own slot to be placed in"),
        Text.of("§7Check your Keybinds for \"Open Belt Slot Inventory\"")
    ])

    //Hyperbox
    if (Platform.isLoaded("hyperbox")) {
        allthemods.add('hyperbox:hyperbox', [
            Text.of("§aThis mod will be removed on version 6.0+")
        ])
    }

    //Eternal Starlight
    if (Platform.isLoaded("eternal_starlight")) {
        allthemods.add('eternal_starlight:loot_bag[eternal_starlight:loot_table="eternal_starlight:bosses/lunar_monstrosity"]', [
            Text.of('This loot bag is from the \"Lunar Monstrosity\".')
        ])
    }

    if (Platform.isLoaded('modular_machinery_reborn')) {
        allthemods.add('modular_machinery_reborn:controller[modular_machinery_reborn:machine="atm:runic_crucible"]', [
            Text.of('§cWARNING, this machine has be depreciated.'),
            Text.of('Use crafting table to convert to the new version.')
        ])
        allthemods.add('modular_machinery_reborn:controller[modular_machinery_reborn:machine="atm:runic_star_altar"]', [
            Text.of('§cWARNING, this machine has be depreciated.'),
            Text.of('Use crafting table to convert to the new version.')
        ])
        allthemods.add('modular_machinery_reborn:controller[modular_machinery_reborn:machine="atm:runic_enchanter"]', [
            Text.of('§cWARNING, this machine has be depreciated.'),
            Text.of('Use crafting table to convert to the new version.')
        ])
        allthemods.add('modular_machinery_reborn:controller[modular_machinery_reborn:machine="atm:auto_hepheastus_forge"]', [
            Text.of('§cWARNING, this machine has be depreciated.'),
            Text.of('Use crafting table to convert to the new version.')
        ])
    }
    // Apotheosis Gateway Warning
    allthemods.add([
        'gateways:gate_pearl[gateways:gateway="apotheosis:tiered/frontier"]',
        'gateways:gate_pearl[gateways:gateway="apotheosis:tiered/ascent"]',
        'gateways:gate_pearl[gateways:gateway="apotheosis:tiered/summit"]',
        'gateways:gate_pearl[gateways:gateway="apotheosis:tiered/pinnacle"]'],
        [
            Text.of("§cWARNING: Will implode at wave 3 outside of the following dimensions:"),
            Text.of("§cOverworld, The Nether, The End, The Twilight Forest")
        ])
    // Botany Pot Sculk
    allthemods.add([
        "minecraft:sculk",
        "minecraft:sculk_sensor",
        "minecraft:sculk_catalyst",
        "minecraft:sculk_vein",
        "minecraft:sculk_shrieker",
        "deeperdarker:gloomy_sculk",
        "deeperdarker:gloomy_grass",
        "deeperdarker:glowing_flowers",
        "deeperdarker:sculk_vines",
        "deeperdarker:glowing_roots",
        "deeperdarker:bloom_berries",
        "deeperdarker:glowing_grass",
        "deeperdarker:sculk_tendrils"],
        [
            Text.of("§9In a Botany Pot: Requires a hoe enchanted with Silk Touch to be harvested")
        ])
})



