

ItemEvents.modifyTooltips(event => {

    event.add('toolbelt:belt', [
        Text.of("§7Has it's own slot to be placed in"),
        Text.of("§7Check your Keybinds for \"Open Belt Slot Inventory\"")
    ])

    //Hyperbox
    if (Platform.isLoaded("hyperbox")) {
        event.add('hyperbox:hyperbox', [
            Text.of("§aThis mod will be removed on version 6.0+")
        ])
    }

    // Botany Pot Sculk
    event.add([
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



