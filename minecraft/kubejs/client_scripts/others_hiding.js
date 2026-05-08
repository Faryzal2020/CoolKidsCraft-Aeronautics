RecipeViewerEvents.removeEntriesCompletely('item', event => {
    event.remove([
        'pneumaticcraft:diesel_bucket',
        'tfmg:diesel_bucket',
        'createaddition:bioethanol_bucket',
        'tacz:gun_smith_table',
        'tacz:modern_kinetic_gun',
        'railcraft:lead_ingot',
        'railcraft:nickel_ingot',
        'tfmg:molten_plastic_bucket',
        'tfmg:plastic_sheet',
        'pneumaticcraft:plastic',
        'tfmg:plastic_block'
    ])
})

RecipeViewerEvents.removeEntriesCompletely('fluid', event => {
    event.remove('tfmg:molten_plastic')
    event.remove('tfmg:crude_oil')
    event.remove('tfmg:heavy_oil')
    event.remove('pneumaticcraft:oil')
    event.remove('pneumaticcraft:diesel')
    event.remove('tfmg:diesel')
    event.remove('createaddition:bioethanol')
})
