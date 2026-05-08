
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

    event.remove({ id: "oritech:motor/manualbattery" })
    event.shaped(Item.of('oritech:basic_battery', 1), [
        ' A ',
        'BCB',
        'BDB'
    ], {
        A: 'minecraft:copper_nugget',
        B: '#c:plates/plastic',
        C: 'tfmg:lithium_charge',
        D: '#c:ingots/electrum'
    }).id('oritech:motor/manualbattery')

    event.remove({ id: "oritech:motor/advbattery" })
    event.shaped(Item.of('oritech:advanced_battery', 1), [
        ' A ',
        'BCB',
        'BDB'
    ], {
        A: 'powah:steel_energized',
        B: '#c:plates/aluminum',
        C: 'tfmg:lithium_charge',
        D: '#c:ingots/energite'
    }).id('oritech:motor/advbattery')

    // Battery Tweaks
    let aaBatteries = [
        'actuallyadditions:single_battery',
        'actuallyadditions:double_battery',
        'actuallyadditions:triple_battery',
        'actuallyadditions:quadruple_battery',
        'actuallyadditions:quintuple_battery'
    ]
    aaBatteries.forEach(battery => {
        event.replaceInput({ output: battery }, 'actuallyadditions:advanced_coil', 'tfmg:lithium_charge')
    })

    let powahBatteries = [
        'powah:battery_starter',
        'powah:battery_basic',
        'powah:battery_hardened',
        'powah:battery_blazing',
        'powah:battery_niotic',
        'powah:battery_spirited',
        'powah:battery_nitro'
    ]
    powahBatteries.forEach(battery => {
        event.replaceInput({ output: battery }, 'minecraft:redstone_block', 'tfmg:lithium_charge')
    })

    event.replaceInput({ output: 'integrateddynamics:energy_battery' }, 'minecraft:redstone_block', 'powah:battery_basic')
    event.replaceInput({ output: 'sophisticatedbackpacks:battery_upgrade' }, 'minecraft:redstone_block', 'powah:battery_basic')
    event.replaceInput({ output: 'mininggadgets:upgrade_battery_1' }, 'minecraft:quartz', 'oritech:basic_battery')
    event.replaceInput({ output: 'mininggadgets:upgrade_battery_2' }, 'minecraft:quartz', 'oritech:basic_battery')
    event.replaceInput({ output: 'mininggadgets:upgrade_battery_2' }, 'minecraft:iron_ingot', 'powah:steel_energized')
    event.replaceInput({ output: 'mininggadgets:upgrade_battery_3' }, 'minecraft:quartz', 'oritech:advanced_battery')
    event.replaceInput({ output: 'mininggadgets:upgrade_battery_3' }, 'minecraft:gold_ingot', '#c:ingots/electrum')
    event.replaceInput({ output: 'mininggadgets:upgrade_battery_3' }, 'minecraft:quartz_block', '#c:plates/aluminum')

    event.replaceInput({ output: 'oritech:reactor_condenser' }, 'minecraft:ice', 'undergarden:froststeel_ingot')
    event.replaceInput({ output: 'oritech:atomic_forge_block' }, 'oritech:duratium_ingot', 'cataclysm:ignitium_ingot')

})
