

ServerEvents.recipes(allthemods => {
    // Tools
    allthemods.remove({ id: 'railcraft:steel_sword' })
    allthemods.remove({ id: 'railcraft:steel_pickaxe' })
    allthemods.remove({ id: 'railcraft:steel_axe' })
    allthemods.remove({ id: 'railcraft:steel_shovel' })
    allthemods.remove({ id: 'railcraft:steel_hoe' })


    // Armor
    allthemods.remove({ id: 'railcraft:steel_helmet' })
    allthemods.remove({ id: 'railcraft:steel_chestplate' })
    allthemods.remove({ id: 'railcraft:steel_leggings' })
    allthemods.remove({ id: 'railcraft:steel_boots' })

    // Shields
    allthemods.remove({ id: 'the_bumblezone:honey_crystal_shield' })
    allthemods.remove({ id: 'twilightforest:equipment/knightmetal_shield' })
    allthemods.remove({ id: 'undergarden:cloggrum_shield' })

    allthemods.shaped('the_bumblezone:honey_crystal_shield', ['HSH', 'HHH', ' H '], {
        S: 'minecraft:shield',
        H: 'the_bumblezone:honey_crystal_shards'
    }).id('allthemods:the_bumblezone/honey_crystal_shield')
    allthemods.shaped('twilightforest:knightmetal_shield', ['KSK', 'KKK', ' K '], {
        S: 'minecraft:shield',
        K: '#c:ingots/knightmetal'
    }).id('allthemods:twilightforest/knightmetal_shield')
    allthemods.shaped('undergarden:cloggrum_shield', ['CSC', 'CCC', ' C '], {
        S: 'minecraft:shield',
        C: '#c:ingots/cloggrum'
    }).id('allthemods:undergarden/cloggrum_shield')
})

