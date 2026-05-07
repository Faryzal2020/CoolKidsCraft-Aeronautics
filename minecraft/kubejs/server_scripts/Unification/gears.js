

ServerEvents.recipes(event => {


    event.shaped('pneumaticcraft:compressed_iron_gear', [' C ', 'CNC', ' C '], {
        C: 'pneumaticcraft:ingot_iron_compressed',
        N: 'minecraft:iron_nugget'
    }).id('kubejs:pneumaticcraft/compressed_iron_gear')

})

