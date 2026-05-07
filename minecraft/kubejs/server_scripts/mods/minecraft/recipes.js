

ServerEvents.recipes(event => {

    event.shaped(
        Item.of('minecraft:sculk', 1), // arg 1: output
        [
            'OOO',
            'OOO',
            'OOO'
        ],
        {
            O: 'minecraft:echo_shard',
        }
    )

    event.shaped(
        Item.of('minecraft:sculk_sensor', 1), // arg 1: output
        [
            '   ',
            'VCV',
            'SSS'
        ],
        {
            V: 'minecraft:twisting_vines',
            C: 'minecraft:comparator',
            S: 'minecraft:sculk',
        }
    )


})


