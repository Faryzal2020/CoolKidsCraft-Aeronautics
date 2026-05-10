ServerEvents.recipes(event => {
    event.shaped(
        Item.of('drivebywire:wire', 2),
        [
            ' A ',
            ' B ',
            ' A '
        ],
        {
            A: 'powah:dielectric_paste',
            B: 'tfmg:copper_wire'
        }
    )

    event.shaped(
        Item.of('drivebywire:wire_cutter', 1),
        [
            ' A ',
            'B A',
            ' B '
        ],
        {
            A: 'minecraft:iron_ingot',
            B: 'minecraft:stick'
        }
    )

    event.shapeless("drivebywire:controller_hub", ["create:linked_controller", "create:brass_casing", "drivebywire:wire"])

    event.shapeless("drivebywire:tweaked_controller_hub", ["create_tweaked_controllers:tweaked_linked_controller", "create:brass_casing", "drivebywire:wire"])

    event.shaped(
        Item.of('drivebywire:backup_block', 1),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            A: 'minecraft:dried_kelp',
            B: 'create:transmitter'
        }
    )
});