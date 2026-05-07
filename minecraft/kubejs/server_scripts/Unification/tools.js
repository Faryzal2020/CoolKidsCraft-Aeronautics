

ServerEvents.recipes(event => {
    event.shaped('twilightforest:knightmetal_shield', ['KSK', 'KKK', ' K '], {
        S: 'minecraft:shield',
        K: '#c:ingots/knightmetal'
    }).id('kubejs:twilightforest/knightmetal_shield')
    event.shaped('undergarden:cloggrum_shield', ['CSC', 'CCC', ' C '], {
        S: 'minecraft:shield',
        C: '#c:ingots/cloggrum'
    }).id('kubejs:undergarden/cloggrum_shield')
})

