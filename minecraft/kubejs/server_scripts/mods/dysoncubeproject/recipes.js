

ServerEvents.recipes(allthemods => {

    allthemods.shaped(
        Item.of('kubejs:allthemodium_solar_sail_package', 1),
        [
            'AAA',
            'APA',
            'AAA'
        ],
        {
            A: '#c:plates/allthemodium',
            P: 'dysoncubeproject:solar_sail_package'
        }
    )

    allthemods.shaped(
        Item.of('kubejs:allthemodium_beam_package', 1),
        [
            ' A ',
            'APA',
            ' A '
        ],
        {
            A: '#c:plates/allthemodium',
            P: 'dysoncubeproject:beam_package'
        }
    )

    // Beams
    allthemods.remove({ output: 'dysoncubeproject:beam' })
    allthemods.shaped(
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
    ).id('allthemods:dysoncubeproject/beam')
})

