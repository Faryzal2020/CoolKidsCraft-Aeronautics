ServerEvents.recipes(event => {
    // Washing (Splashing)
    event.recipes.create.splashing('9x tfmg:lithium_nugget', 'tfmg:crushed_raw_lithium')
    event.recipes.create.splashing('9x tfmg:lead_nugget', 'create:crushed_raw_lead')
    event.recipes.create.splashing('9x tfmg:aluminum_nugget', 'create:crushed_raw_aluminum')

    // Crushing
    //event.recipes.createCrushing(['oritech:nickel_clump', Item.of('create:experience_nugget').withChance(0.25)], '#c:raw_materials/nickel').processingTime(250)

    event.remove({ id: "railcraft:rolling/tin_plate" })
    event.remove({ id: "railcraft:rolling/silver_plate" })
    event.remove({ id: "railcraft:rolling/bronze_plate" })
    event.remove({ id: "railcraft:rolling/invar_plate" })
    event.remove({ id: "railcraft:rolling/zinc_plate" })

    const pressing = [
        { output: 'railcraft:tin_plate', input: '#c:ingots/tin' },
        { output: 'railcraft:silver_plate', input: '#c:ingots/silver' },
        { output: 'railcraft:bronze_plate', input: '#c:ingots/bronze' },
        { output: 'railcraft:invar_plate', input: '#c:ingots/invar' }
    ]

    pressing.forEach(recipe => {
        event.custom({
            type: 'create:pressing',
            ingredients: [
                recipe.input.startsWith('#') ? { tag: recipe.input.substring(1) } : { item: recipe.input }
            ],
            results: [
                { id: recipe.output }
            ]
        }).id(`kubejs:create/pressing/${recipe.output.replace(':', '_')}`)
    })
})
