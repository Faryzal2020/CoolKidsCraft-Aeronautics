

ServerEvents.recipes(event => {

    event.remove({ id: 'dysoncubeproject:solar_sail' })
    event.remove({ id: 'dysoncubeproject:beam' })
    event.shaped(
        Item.of('dysoncubeproject:solar_sail', 1),
        [
            '   ',
            'ABA',
            'ACA'
        ],
        {
            A: 'oritech:carbon_fibre_strands',
            B: 'enderio:photovoltaic_plate',
            C: 'createpropulsion:thruster'
        }
    )
    // Beams
    event.shaped(
        Item.of('dysoncubeproject:beam', 4),
        [
            'ABA',
            'CBC',
            'ABA'
        ],
        {
            A: 'pneumaticcraft:ingot_iron_compressed',
            B: '#c:ingots/steel',
            C: 'oritech:carbon_fibre_strands'
        }
    )
})

