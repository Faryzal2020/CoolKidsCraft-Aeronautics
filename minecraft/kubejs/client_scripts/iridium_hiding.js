
RecipeViewerEvents.removeEntriesCompletely('item', event => {
    event.remove([
        'productivemetalworks:molten_iridium_bucket'
    ])
})

RecipeViewerEvents.removeEntriesCompletely('fluid', event => {
    event.remove('productivemetalworks:molten_iridium')
})
