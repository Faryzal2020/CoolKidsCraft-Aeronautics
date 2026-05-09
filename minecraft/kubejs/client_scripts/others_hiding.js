RecipeViewerEvents.removeEntriesCompletely('item', event => {
    const itemsToRemove = [
        'pneumaticcraft:diesel_bucket',
        'tfmg:diesel_bucket',
        'createaddition:bioethanol_bucket',
        'tacz:gun_smith_table',
        'railcraft:lead_ingot',
        'railcraft:nickel_ingot',
        'tfmg:molten_plastic_bucket',
        'tfmg:plastic_sheet',
        'pneumaticcraft:plastic',
        'tfmg:plastic_block',
        'tfmg:silicon_ingot',
        'tfmg:liquid_silicon_bucket',
        'tfmg:molten_iron_bucket',
        'tfmg:molten_gold_bucket',
        'tfmg:molten_copper_bucket',
        'tfmg:molten_tin_bucket',
        'tfmg:molten_lead_bucket',
        'tfmg:molten_silver_bucket',
        'tfmg:molten_nickel_bucket',
        'tfmg:molten_aluminum_bucket',
        'tfmg:molten_zinc_bucket',
        'tfmg:molten_steel_bucket',
        'tfmg:molten_bronze_bucket',
        'create:molten_iron_bucket',
        'create:molten_gold_bucket',
        'create:molten_copper_bucket',
        'createbigcannons:molten_steel_bucket',
        'createbigcannons:molten_cast_iron_bucket',
        'createbigcannons:molten_bronze_bucket'
    ]

    const existingItems = itemsToRemove.filter(id => Item.exists(id))
    if (existingItems.length > 0) {
        event.remove(existingItems)
    }
})

RecipeViewerEvents.removeEntriesCompletely('fluid', event => {
    const fluidsToRemove = [
        'tfmg:molten_plastic',
        'tfmg:crude_oil',
        'tfmg:heavy_oil',
        'pneumaticcraft:oil',
        'pneumaticcraft:diesel',
        'tfmg:diesel',
        'createaddition:bioethanol',
        'tfmg:liquid_silicon',
        'createbigcannons:molten_steel',
        'createbigcannons:molten_cast_iron',
        'createbigcannons:molten_bronze',
        'tfmg:molten_steel'
    ]

    const existingFluids = fluidsToRemove.filter(id => !Fluid.of(id).empty)
    existingFluids.forEach(id => {
        event.remove(id)
    })
})
