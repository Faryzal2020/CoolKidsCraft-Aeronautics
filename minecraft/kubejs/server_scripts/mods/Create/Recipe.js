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
    event.recipes.create.pressing('thermal:enderium_ingot', 'thermal:enderium_dust')
    event.recipes.create.pressing('thermal:lumium_ingot', 'thermal:lumium_dust')
    event.recipes.create.pressing('thermal:signalum_ingot', 'thermal:signalum_dust')
    //event.smelting('mekanism:ingot_refined_glowstone', 'mekanism:dust_refined_glowstone') couldn't find dust refined glowstone definition anywhere

    // Refined Obsidian Recipes
    // Ingot into Dust
    event.recipes.create.crushing('mekanism:dust_refined_obsidian', 'mekanism:ingot_refined_obsidian')
    event.recipes.create.crushing('thermal:enderium_dust', 'thermal:enderium_ingot')
    event.recipes.create.crushing('thermal:lumium_dust', 'thermal:lumium_ingot')
    event.recipes.create.crushing('thermal:signalum_dust', 'thermal:signalum_ingot')
    event.recipes.create.crushing('enderio:powdered_tin', 'railcraft:tin_ingot')

    // Melting (Dust/Ingot/Block into Molten)
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_refined_obsidian', 90), 'mekanism:ingot_refined_obsidian').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_refined_obsidian', 90), 'mekanism:dust_refined_obsidian').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_refined_obsidian', 810), 'mekanism:block_refined_obsidian').heated()

    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_enderium', 90), 'thermal:enderium_ingot').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_enderium', 90), 'thermal:enderium_dust').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_enderium', 810), 'thermal:enderium_block').heated()

    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_lumium', 90), 'thermal:lumium_ingot').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_lumium', 90), 'thermal:lumium_dust').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_lumium', 810), 'thermal:lumium_block').heated()

    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_signalum', 90), 'thermal:signalum_ingot').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_signalum', 90), 'thermal:signalum_dust').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_signalum', 810), 'thermal:signalum_block').heated()

    // Alloy Mixing: 4 Silver + 1 Diamond + 4 Obsidian -> 1 Bucket Molten Refined Obsidian
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_refined_obsidian', 1000), [
        '4x railcraft:silver_dust',
        'createaddition:diamond_grit',
        '4x create:powdered_obsidian'
    ]).heated()

    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_enderium', 360), [
        '3x tfmg:lead_ingot',
        'oritech:platinum_ingot',
        '2x railcraft:ender_dust'
    ]).heated()

    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_lumium', 360), [
        '3x enderio:powdered_tin',
        'railcraft:silver_ingot',
        '4x minecraft:glowstone'
    ]).heated()

    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_signalum', 360), [
        '3x oritech:copper_dust',
        'railcraft:silver_ingot',
        '4x minecraft:redstone'
    ]).heated()
})
