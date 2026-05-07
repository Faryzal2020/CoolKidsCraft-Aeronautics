ServerEvents.recipes(event => {
    // Override ironfurnaces upgrades for allthemodium so it doesn't throw empty ingredient errors when the mod is disabled
    if (Platform.isLoaded('allthemodium')) {
        event.shaped('ironfurnaces:upgrade_allthemodium', [
            'B#B',
            '#X#',
            'B#B'
        ], {
            '#': '#c:ingots/allthemodium',
            'B': '#c:storage_blocks/allthemodium',
            'X': '#ironfurnaces:netherite_upgrade_crafting'
        }).id('ironfurnaces:upgrades/upgrade_allthemodium')

        event.shaped('ironfurnaces:upgrade_unobtainium', [
            'B#B',
            '#X#',
            'B#B'
        ], {
            '#': '#c:ingots/unobtainium',
            'B': '#c:storage_blocks/unobtainium',
            'X': '#c:ingots/vibranium'
        }).id('ironfurnaces:upgrades/upgrade_unobtainium')

        event.shaped('ironfurnaces:upgrade_vibranium', [
            'B#B',
            '#X#',
            'B#B'
        ], {
            '#': '#c:ingots/vibranium',
            'B': '#c:storage_blocks/vibranium',
            'X': '#c:ingots/allthemodium'
        }).id('ironfurnaces:upgrades/upgrade_vibranium')
    }
})
