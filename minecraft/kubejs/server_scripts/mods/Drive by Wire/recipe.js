ServerEvents.recipes(event => {
    event.remove({ id: "drivebywire:wire" })
    event.shaped(
        Item.of('drivebywire:wire', 1),
        [
            'AAA',
            'BBB',
            'AAA'
        ],
        {
            A: 'powah:dielectric_paste',
            B: 'tfmg:copper_wire'
        }
    )
    event.replaceInput({ output: 'drivebywire:controller_hub' }, 'minecraft:ender_eye', 'rftoolsbase:infused_enderpearl')
    event.replaceInput({ output: 'drivebywire:tweaked_controller_hub' }, 'minecraft:ender_eye', 'rftoolsbase:infused_enderpearl')

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