const OBSIDIAN_HARDNESS = 50.0
const OBSIDIAN_RESISTANCE = 1200.0

BlockEvents.modification(event => {
    // Nether Bricks -> 40% Obsidian
    event.modify(/^(?=.*nether)(?=.*brick).*$/, block => {
        block.destroySpeed = OBSIDIAN_HARDNESS * 0.4
        block.explosionResistance = OBSIDIAN_RESISTANCE * 0.4
    })

    // Blackstone -> 50% Obsidian
    event.modify(/^(?=.*blackstone).*$/, block => {
        block.destroySpeed = OBSIDIAN_HARDNESS * 0.5
        block.explosionResistance = OBSIDIAN_RESISTANCE * 0.5
    })

    // End Blocks -> 40% Obsidian
    event.modify(/^(?=.*end)(?=.*(stone)).*$/, block => {
        block.destroySpeed = OBSIDIAN_HARDNESS * 0.4
        block.explosionResistance = OBSIDIAN_RESISTANCE * 0.4
    })

    // End Bricks -> 70% Obsidian
    event.modify(/^(?=.*end)(?=.*(brick)).*$/, block => {
        block.destroySpeed = OBSIDIAN_HARDNESS * 0.7
        block.explosionResistance = OBSIDIAN_RESISTANCE * 0.7
    })
})
