
ServerEvents.recipes(event => {
    // This removes the recipe that allows crafting brass by just mixing items in a grid.
    event.remove({ output: 'railcraft:brass_ingot', type: 'minecraft:crafting_shapeless' })

    event.remove({ id: "railcraft:rolling/steel_plate" })

    // This forces the use of more advanced processing for other metals.
    let removeSmelting = [
        "minecraft:gold_ingot",
        "minecraft:copper_ingot",
        "oritech:nickel_ingot",
        "railcraft:silver_ingot",
        "tfmg:lead_ingot",
        "tfmg:aluminum_ingot",
        "oritech:platinum_ingot",
        "create:zinc_ingot",
        "tfmg:lithium_ingot"
    ]

    let removeBlasting = [
        "minecraft:gold_ingot",
        "minecraft:copper_ingot",
        "oritech:nickel_ingot",
        "railcraft:silver_ingot",
        "tfmg:lead_ingot",
        "tfmg:aluminum_ingot",
        "oritech:platinum_ingot",
        "create:zinc_ingot",
        "tfmg:lithium_ingot"
    ]

    removeSmelting.forEach(i => {
        event.remove({
            type: 'minecraft:smelting',
            output: i
        })
    })

    removeBlasting.forEach(i => {
        event.remove({
            type: 'minecraft:blasting',
            output: i
        })
    })



    // Replace Duratium Ingot with Blutonium Ingot
    event.replaceInput({ output: 'oritech:accelerator_motor' }, 'oritech:duratium_ingot', 'bigreactors:blutonium_ingot')


    event.replaceInput({ output: 'powah:aerial_pearl' }, 'minecraft:ender_pearl', 'create_deep_dark:echo_ingot')
    event.replaceInput({ output: 'powah:player_transmitter_basic' }, 'powah:dielectric_casing', 'create_deep_dark:echo_ingot')
    event.replaceInput({ output: 'powah:player_transmitter_hardened' }, 'powah:dielectric_casing', 'create_deep_dark:echo_ingot')
    event.replaceInput({ output: 'powah:player_transmitter_blazing' }, 'powah:dielectric_casing', 'create_deep_dark:echo_ingot')
    event.replaceInput({ output: 'powah:player_transmitter_niotic' }, 'powah:dielectric_casing', 'create_deep_dark:echo_ingot')
    event.replaceInput({ output: 'powah:player_transmitter_spirited' }, 'powah:dielectric_casing', 'create_deep_dark:echo_ingot')
    event.replaceInput({ output: 'powah:player_transmitter_nitro' }, 'powah:dielectric_casing', 'create_deep_dark:echo_ingot')

    event.replaceInput({ output: 'bigreactors:reprocessorcontroller' }, 'minecraft:comparator', 'oritech:processing_unit')
    event.replaceInput({ output: 'bigreactors:fluidizercontroller' }, 'minecraft:comparator', 'oritech:processing_unit')
    event.replaceInput({ output: 'bigreactors:energizercontroller' }, 'minecraft:comparator', 'oritech:processing_unit')
    event.replaceInput({ output: 'bigreactors:basic_reactorcontroller' }, 'minecraft:comparator', 'oritech:processing_unit')
    event.replaceInput({ output: 'bigreactors:reinforced_reactorcontroller' }, 'minecraft:comparator', 'oritech:processing_unit')
    event.replaceInput({ output: 'bigreactors:basic_turbinecontroller' }, 'minecraft:comparator', 'oritech:processing_unit')
    event.replaceInput({ output: 'bigreactors:reinforced_turbinecontroller' }, 'minecraft:comparator', 'oritech:processing_unit')



})
