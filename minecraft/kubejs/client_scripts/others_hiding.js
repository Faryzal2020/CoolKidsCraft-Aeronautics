RecipeViewerEvents.removeEntriesCompletely('item', event => {
    event.remove([
        'pneumaticcraft:diesel_bucket',
        'tfmg:diesel_bucket',
        'createaddition:bioethanol_bucket'
    ])
})

RecipeViewerEvents.removeEntriesCompletely('fluid', event => {
    event.remove('tfmg:crude_oil')
    event.remove('tfmg:heavy_oil')
    event.remove('pneumaticcraft:oil')
    event.remove('pneumaticcraft:diesel')
    event.remove('tfmg:diesel')
    event.remove('createaddition:bioethanol')
})
