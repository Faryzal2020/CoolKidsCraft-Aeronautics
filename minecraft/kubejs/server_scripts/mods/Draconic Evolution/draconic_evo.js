

ServerEvents.recipes(allthemods => {
    allthemods.custom({
        type: 'create:crushing',
        ingredients: [{ item: 'draconicevolution:awakened_draconium_ingot' }],
        processingTime: 300,
        results: [
            { id: 'draconicevolution:awakened_draconium_dust' }
        ]
    }).id(`allthemods:create/crushing/awakened_draconium_dust`)

    allthemods.recipes.occultism.crushing(RecipeResult.of("draconicevolution:awakened_draconium_dust"), Ingredient.of("draconicevolution:awakened_draconium_ingot"))
        .ignoreCrushingMultiplier(true)
        .id(`allthemods:occultism/crushing/awakened_draconium_dust`)

    allthemods.custom({
        type: 'create:crushing',
        ingredients: [{ item: 'draconicevolution:draconium_ingot' }],
        processingTime: 300,
        results: [
            { id: 'draconicevolution:draconium_dust' }
        ]
    }).id(`allthemods:create/crushing/draconium_dust`)

    allthemods.recipes.occultism.crushing(RecipeResult.of("draconicevolution:draconium_dust"), "draconicevolution:draconium_ingot")
        .ignoreCrushingMultiplier(true)
        .id(`allthemods:occultism/crushing/draconium_dust`)

})

