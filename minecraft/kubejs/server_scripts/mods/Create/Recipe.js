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

    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_uranium', 90), 'bigreactors:yellorium_ingot').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_uranium', 90), 'oritech:uranium_dust').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_uranium', 810), 'bigreactors:yellorium_block').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_uranium', 90), 'create:crushed_raw_uranium').heated()
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_uranium', 180), '#c:raw_materials/uranium').heated()

    // Alloy Mixing: 4 Silver + 1 Diamond + 4 Obsidian -> 1 Bucket Molten Refined Obsidian
    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_refined_obsidian', 1000), [
        '4x create:crushed_raw_silver',
        'createaddition:diamond_grit',
        '4x create:powdered_obsidian'
    ]).heated()

    event.recipes.create.mixing(Fluid.of('productivemetalworks:molten_enderium', 360), [
        '3x tfmg:lead_ingot',
        'oritech:platinum_dust',
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

    // Molten to Block Compacting
    const moltenCompacting = [
        { fluid: 'productivemetalworks:molten_obsidian', block: 'minecraft:obsidian', amount: 1000 },
        { fluid: 'productivemetalworks:molten_emerald', block: 'minecraft:emerald_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_diamond', block: 'minecraft:diamond_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_lapis', block: 'minecraft:lapis_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_quartz', block: 'minecraft:quartz_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_carbon', block: 'minecraft:coal_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_iron', block: 'minecraft:iron_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_copper', block: 'minecraft:copper_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_gold', block: 'minecraft:gold_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_netherite', block: 'minecraft:netherite_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_aluminum', block: 'tfmg:aluminum_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_lead', block: 'tfmg:lead_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_nickel', block: 'oritech:nickel_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_platinum', block: 'oritech:platinum_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_silver', block: 'railcraft:silver_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_tin', block: 'railcraft:tin_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_uranium', block: 'bigreactors:yellorium_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_zinc', block: 'create:zinc_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_invar', block: 'railcraft:invar_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_electrum', block: 'oritech:electrum_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_brass', block: 'create:brass_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_enderium', block: 'thermal:enderium_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_lumium', block: 'thermal:lumium_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_signalum', block: 'thermal:signalum_block', amount: 810 },
        { fluid: 'sgearmetalworks:molten_crimson_iron', block: 'silentgear:crimson_iron_block', amount: 810 },
        { fluid: 'sgearmetalworks:molten_crimson_steel', block: 'silentgear:crimson_steel_block', amount: 810 },
        { fluid: 'sgearmetalworks:molten_blaze_gold', block: 'silentgear:blaze_gold_block', amount: 810 },
        { fluid: 'sgearmetalworks:molten_azure_silver', block: 'silentgear:azure_silver_block', amount: 810 },
        { fluid: 'sgearmetalworks:molten_azure_electrum', block: 'silentgear:azure_electrum_block', amount: 810 },
        { fluid: 'productivemetalworks:molten_constantan', block: 'tfmg:constantan_block', amount: 810 }
    ]

    moltenCompacting.forEach(recipe => {
        event.recipes.create.compacting(recipe.block, Fluid.of(recipe.fluid, recipe.amount)).id(`kubejs:create/compacting/${recipe.block.replace(':', '_')}`)
    })
})
