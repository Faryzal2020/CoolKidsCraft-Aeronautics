
ServerEvents.recipes(event => {

    event.remove({ output: 'railcraft:brass_ingot', type: 'minecraft:crafting_shapeless' })

    event.remove({ id: "railcraft:rolling/steel_plate" })
    event.remove({ id: "silentgear:crimson_steel_ingot" })
    event.remove({ id: "silentgear:blaze_gold_ingot" })
    event.remove({ id: "silentgear:azure_electrum_ingot" })

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
        "tfmg:lithium_ingot",
        "railcraft:tin_ingot",
        "silentgear:crimson_iron_ingot",
        "silentgear:crimson_steel_ingot",
        "silentgear:blaze_gold_ingot",
        "silentgear:azure_silver_ingot",
        "silentgear:azure_electrum_ingot",
        "silentgear:tyrian_steel_ingot"
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
        "tfmg:lithium_ingot",
        "railcraft:tin_ingot",
        "silentgear:crimson_iron_ingot",
        "silentgear:crimson_steel_ingot",
        "silentgear:blaze_gold_ingot",
        "silentgear:azure_silver_ingot",
        "silentgear:azure_electrum_ingot",
        "silentgear:tyrian_steel_ingot"
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

    event.replaceInput({ output: 'sophisticatedbackpacks:everlasting_upgrade' }, 'minecraft:nether_star', 'actuallyadditions:ender_star')
    event.replaceInput({ output: 'minecraft:lodestone' }, 'minecraft:netherite_ingot', 'utilitarian:magnet')
    event.replaceInput({ output: 'rftoolsutility:charged_porter' }, 'minecraft:ender_pearl', 'waystones:warp_stone')
    event.replaceInput({ output: 'rftoolsutility:matter_receiver' }, 'minecraft:ender_pearl', 'rftoolsbase:infused_enderpearl')

    event.remove({ id: "minecraft:ender_eye" })
    event.shaped(Item.of('minecraft:ender_eye', 2), [
        'CAC',
        'ABA',
        'CAC'
    ], {
        A: 'naturesaura:fortress_finder',
        B: 'rftoolsbase:infused_enderpearl',
        C: 'twilightforest:carminite'
    }).id('minecraft:ender_eye')


    event.remove({ id: "oritech:motor/manualbattery" })
    event.shaped(Item.of('oritech:basic_battery', 1), [
        ' A ',
        'BCB',
        'BDB'
    ], {
        A: '#c:nuggets/copper',
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

    event.remove({ id: "sophisticatedbackpacks:battery_upgrade" })
    event.shaped(Item.of('sophisticatedbackpacks:battery_upgrade', 1), [
        'BAB',
        'ACA',
        'BAB'
    ], {
        A: 'powah:battery_basic',
        B: '#c:ingots/energite',
        C: 'sophisticatedbackpacks:upgrade_base'
    }).id('sophisticatedbackpacks:battery_upgrade')

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

    event.replaceInput({ output: 'mffs:battery' }, 'minecraft:redstone', 'tfmg:lithium_charge')
    event.replaceInput({ output: 'integrateddynamics:energy_battery' }, 'minecraft:redstone_block', 'powah:battery_basic')
    event.replaceInput({ output: 'mininggadgets:upgrade_battery_1' }, 'minecraft:quartz', 'oritech:basic_battery')
    event.replaceInput({ output: 'mininggadgets:upgrade_battery_2' }, 'minecraft:quartz', 'oritech:basic_battery')
    event.replaceInput({ output: 'mininggadgets:upgrade_battery_2' }, 'minecraft:iron_ingot', 'powah:steel_energized')
    event.replaceInput({ output: 'mininggadgets:upgrade_battery_3' }, 'minecraft:quartz', 'oritech:advanced_battery')
    event.replaceInput({ output: 'mininggadgets:upgrade_battery_3' }, 'minecraft:gold_ingot', '#c:ingots/electrum')
    event.replaceInput({ output: 'mininggadgets:upgrade_battery_3' }, 'minecraft:quartz_block', '#c:plates/aluminum')

    event.replaceInput({ output: 'oritech:reactor_condenser' }, 'minecraft:ice', 'undergarden:froststeel_ingot')
    event.replaceInput({ output: 'oritech:atomic_forge_block' }, 'oritech:duratium_ingot', 'cataclysm:ignitium_ingot')
    event.replaceInput({ output: 'createpropulsion:ion_thruster' }, 'create:chute', 'oritech:ion_thruster')

    event.replaceInput({ output: 'bigreactors:basic_turbinerotorshaft' }, 'minecraft:iron_ingot', '#c:ingots/steel')
    event.remove({ id: "bigreactors:turbine/basic/blade" })
    event.shaped(Item.of('bigreactors:basic_turbinerotorblade', 1), [
        'AAA',
        'BBB'
    ], {
        A: 'tfmg:heavy_plate',
        B: 'createbigcannons:nethersteel_ingot'
    }).id('bigreactors:turbine/basic/blade')

    event.replaceInput({ output: 'bigreactors:reinforced_turbinerotorshaft' }, '#c:ingots/steel', 'oritech:duratium_ingot')
    event.remove({ id: "bigreactors:turbine/reinforced/blade" })
    event.shaped(Item.of('bigreactors:reinforced_turbinerotorblade', 1), [
        'AAA',
        'BBB'
    ], {
        A: 'oritech:duratium_ingot',
        B: 'createbigcannons:nethersteel_ingot'
    }).id('bigreactors:turbine/reinforced/blade')


    event.remove({ id: "dysoncubeproject:em_railejector_controller" })
    event.recipes.createMechanicalCrafting(Item.of('dysoncubeproject:em_railejector_controller', 1), [
        'DDDDDD',
        'GGGFAD',
        'DDDEDD',
        '  DED ',
        '  ABA ',
        ' AACAA'
    ], {
        A: 'oritech:iron_plating_block',
        B: 'oritech:machine_core_4',
        C: 'bigreactors:energizerchargingport_fe',
        D: 'tfmg:heavy_plate',
        E: 'powah:energy_cable_basic',
        F: 'mffs:fortron_capacitor',
        G: 'oritech:magnetic_coil'
    }).id('dysoncubeproject:em_railejector_controller')


    event.remove({ id: "dysoncubeproject:ray_receiver_controller" })
    event.recipes.createMechanicalCrafting(Item.of('dysoncubeproject:ray_receiver_controller', 1), [
        'DFFFD',
        'DDEDD',
        ' DED ',
        ' ABA ',
        'AACAA'
    ], {
        A: 'tfmg:steel_casing',
        B: 'oritech:machine_core_4',
        C: 'bigreactors:energizerchargingport_fe',
        D: 'oritech:iron_plating_block',
        E: 'powah:energy_cable_basic',
        F: 'actuallyadditions:heat_collector'
    }).id('dysoncubeproject:ray_receiver_controller')
})
