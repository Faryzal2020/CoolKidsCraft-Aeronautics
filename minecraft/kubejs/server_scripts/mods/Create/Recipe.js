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

    event.recipes.create.pressing('mekanism:ingot_refined_obsidian', 'mekanism:dust_refined_obsidian')
    //event.smelting('mekanism:ingot_refined_glowstone', 'mekanism:dust_refined_glowstone') couldn't find dust refined glowstone definition anywhere

    // Refined Obsidian Recipes
    // Ingot into Dust
    event.recipes.create.crushing('mekanism:dust_refined_obsidian', 'mekanism:ingot_refined_obsidian')

    // Melting (Dust/Ingot/Block into Molten)
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_refined_obsidian', 90), 'mekanism:ingot_refined_obsidian').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_refined_obsidian', 90), 'mekanism:dust_refined_obsidian').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_refined_obsidian', 810), 'mekanism:block_refined_obsidian').heated()

    // Alloy Mixing: 4 Silver + 1 Diamond + 4 Obsidian -> 1 Bucket Molten Refined Obsidian
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_refined_obsidian', 1000), [
        '4x railcraft:silver_ingot',
        'minecraft.diamond',
        '4x minecraft:obsidian'
    ]).heated()
})
