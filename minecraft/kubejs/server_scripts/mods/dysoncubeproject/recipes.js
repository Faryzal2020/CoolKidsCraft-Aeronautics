

ServerEvents.recipes(event => {
    /*
        event.shaped(
            [
                'AAA',
                'APA',
                'AAA'
            ],
            {
                P: 'dysoncubeproject:solar_sail_package'
            }
        )
    
        event.shaped(
            [
                ' A ',
                'APA',
                ' A '
            ],
            {
                P: 'dysoncubeproject:beam_package'
            }
        )
    */
    // Beams
    event.shaped(
        Item.of('dysoncubeproject:beam', 1),
        [
            'ABA',
            'CBC',
            'ABA'
        ],
        {
            A: 'minecraft:iron_nugget',
            B: '#c:ingots/steel',
            C: 'minecraft:iron_bars'
        }
    ).id('kubejs:dysoncubeproject/beam')
})

