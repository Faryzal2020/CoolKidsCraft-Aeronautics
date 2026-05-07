
RecipeViewerEvents.removeEntriesCompletely('item', event => {
    event.remove([
        'productivemetalworks:molten_osmium_bucket'
    ])
})

RecipeViewerEvents.removeEntriesCompletely('fluid', event => {
    event.remove('productivemetalworks:molten_osmium')
})
