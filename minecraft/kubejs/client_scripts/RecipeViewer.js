// This File has been authored by AllTheMods Staff, or a Community contributor for use in AllTheMods - AllTheMod 10.
// As all AllTheMods packs are licensed under All Rights Reserved, this file is not allowed to be used in any public packs not released by the AllTheMods Team, without explicit permission.



RecipeViewerEvents.removeEntriesCompletely('item', allthemods => {
    allthemods.remove('allthetweaks:greg_star')
    allthemods.remove('allthetweaks:greg_star_block')



    //allthemods.remove('relics:researching_table')

    let $DyeColor = Java.loadClass("net.minecraft.world.item.DyeColor")
    for (let color of $DyeColor.values()) {
        allthemods.remove(`/refinedstorage:${color}_.*/`)
    }

    allthemods.remove("supplementaries:faucet")
})


// RecipeViewerEvents.removeEntriesCompletely('mekanism:chemical', allthemods => {
//
//     allthemods.remove('mekmm:uu_matter')
//     allthemods.remove('mekmm:unstable_dimensional_gas')
// })

RecipeViewerEvents.removeRecipes(event => {
    event.remove(["xycraft_machines:extractor/enderio/grains_of_infinity"])
})
RecipeViewerEvents.removeEntries('item', allthemods => {
    // From JEI blacklist.json
    allthemods.remove([
        "railcraft:steel_sword",
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
        "twilightforest:uncrafting_table"]
    )


    if (Platform.isLoaded("hyperbox")) {
        allthemods.remove("hyperbox:hyperbox")
    }

    if (Platform.isLoaded("mysticalagriculture")) {
        allthemods.remove("mysticalagriculture:creative_soulium_dagger")
    }


})

RecipeViewerEvents.addInformation('item', allthemods => {
    allthemods.add('justdirethings:polymorphic_catalyst', [
        '§8Drop a §cPolymorphic Catalyst§8 into §1Water§8 to get Polymorphic Fluid'
    ])
    allthemods.add('justdirethings:portal_fluid_catalyst', [
        '§8Drop a §dPortal Fluid Catalyst§8 into Polymorphic Fluid§8 in t§dThe End§8 to get §5Unstable Portal Fluid'
    ])
})

RecipeViewerEvents.addInformation('fluid', allthemods => {
    allthemods.add("justdirethings:polymorphic_fluid_source", [
        '§8Drop a §cPolymorphic Catalyst§8 into §bWater§8 to get Polymorphic Fluid'
    ])
    allthemods.add("justdirethings:unstable_portal_fluid_source", [
        '§8Drop a §dPortal Fluid Catalyst§8 into §dPolymorphic Fluid§8 in §5The End§8 to get §5Unstable Portal Fluid'
    ])
})



