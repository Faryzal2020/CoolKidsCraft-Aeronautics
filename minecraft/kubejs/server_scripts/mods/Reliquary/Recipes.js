

ServerEvents.recipes(event => {
    event.shaped('reliquary:fertile_lily_pad', [
        'EME',
        'MLM',
        'EME'
    ], {
        E: 'reliquary:fertile_essence',
        L: 'minecraft:lily_pad',
        M: 'naturesaura:effect_powder[naturesaura:effect_powder_data={effect:"naturesaura:plant_boost"}]'
    })
})

