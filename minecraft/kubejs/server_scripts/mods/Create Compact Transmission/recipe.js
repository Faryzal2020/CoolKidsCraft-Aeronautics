ServerEvents.recipes(event => {
    event.shaped(
        Item.of('create_compact_transmission:compact_speed_regulator', 1),
        [
            ' C ',
            'BAB',
            ' B '
        ],
        {
            A: 'create:adjustable_chain_gearshift',
            B: 'create:cogwheel',
            C: 'create:clutch'
        }
    )
    event.shapeless("create_compact_transmission:speed_compact_changer", ["create_compact_transmission:speed_doubler", "create:clutch", "create:cogwheel"])
    event.shaped(
        Item.of('create_compact_transmission:rotator', 1),
        [
            ' B ',
            ' A ',
            ' B '
        ],
        {
            A: 'create:shaft',
            B: 'create:clutch'
        }
    )
    event.shaped(
        Item.of('create_compact_transmission:speed_doubler', 1),
        [
            ' B ',
            ' A ',
            ' B '
        ],
        {
            A: 'create:adjustable_chain_gearshift',
            B: 'create:cogwheel'
        }
    )
    event.shaped(
        Item.of('create_compact_transmission:four_speed_transmission', 1),
        [
            ' B ',
            'BAB',
            ' B '
        ],
        {
            A: 'create:clutch',
            B: 'create:encased_chain_drive'
        }
    )
    event.shaped(
        Item.of('create_compact_transmission:smart_speed_doubler', 1),
        [
            ' C ',
            'DAD',
            ' B '
        ],
        {
            A: 'create:adjustable_chain_gearshift',
            B: 'create:cogwheel',
            C: 'create:precision_mechanism',
            D: 'create:iron_sheet'
        }
    )
    event.shaped(
        Item.of('create_compact_transmission:co2_scrubber', 1),
        [
            ' A ',
            ' A ',
            'BBB'
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:iron_ingot'
        }
    )
    event.shaped(
        Item.of('create_compact_transmission:gearbox_setting', 1),
        [
            ' A ',
            ' AA',
            'A  '
        ],
        {
            A: 'create:iron_sheet'
        }
    )
    event.shaped(
        Item.of('create_compact_transmission:fuel_injector', 1),
        [
            ' B ',
            ' A ',
            ' A '
        ],
        {
            A: 'create:iron_sheet',
            B: 'minecraft:iron_nugget'
        }
    )
    event.shaped(
        Item.of('create_compact_transmission:modern_injector', 1),
        [
            ' B ',
            ' A ',
            ' A '
        ],
        {
            A: '#c:ingots/steel',
            B: '#c:nuggets/steel'
        }
    )

    //event.shapeless("drivebywire:controller_hub", ["create:linked_controller", "create:brass_casing", "drivebywire:wire"])

});