
RecipeViewerEvents.removeEntries('item', event => {
    console.log("[Client Script] Loading server banlist config")
    let config = JsonIO.read("server_banlist_config.json")
    if (config && config.server && config.server.banned_items) {
        config.server.banned_items.forEach(item => {
            event.remove(item)
        })
    }
})

RecipeViewerEvents.removeRecipes(event => {
    event.remove(["xycraft_machines:extractor/enderio/grains_of_infinity"])
})
RecipeViewerEvents.removeEntries('item', event => {
    // From JEI blacklist.json
    event.remove(["railcraft:steel_sword",
        "railcraft:steel_hoe",
        "railcraft:steel_axe",
        "railcraft:steel_pickaxe",
        "railcraft:steel_shovel",
        "railcraft:steel_boots",
        "railcraft:steel_chestplate",
        "railcraft:steel_helmet",
        "railcraft:steel_leggings",
        "bigreactors:reinforced_reactorcreativewatergenerator",
        "bigreactors:basic_turbinecreativesteamgenerator",
        "bigreactors:reinforced_turbinecreativesteamgenerator",
        "enderio:creative_power",
        "modularrouters:creative_module",
        "pneumaticcraft:creative_upgrade",
        "rftoolspower:dimensionalcell_creative",
        "xycraft_machines:item_selector",
        "xycraft_machines:fluid_selector",
        "naturesaura:multiblock_maker",
        "mininggadgets:upgrade_battery_creative",
        "twilightforest:uncrafting_table",
        "waystones:dormant_shard",
        "waystones:warp_plate"
    ])

})




