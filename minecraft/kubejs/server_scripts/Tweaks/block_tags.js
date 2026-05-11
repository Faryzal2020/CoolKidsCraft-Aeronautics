
ServerEvents.tags('block', event => {
    // Railcraft Sulfur Fix
    event.add('c:ores/sulfur', 'railcraft:sulfur_ore')
    
    // Firestone Fix
    event.add('c:ores/firestone', 'railcraft:firestone_ore')
    
    // Big Reactors / Extreme Reactors
    event.add('c:ores/uranium', 'bigreactors:yellorite_ore')
    event.add('c:ores/benitoite', 'bigreactors:benitoite_ore')
    
    // Draconium
    event.add('c:ores/draconium', [
        'draconicevolution:draconium_ore',
        'draconicevolution:deepslate_draconium_ore'
    ])
})

ServerEvents.tags('item', event => {
    // Ensuring items also have the tags for consistency
    event.add('c:ores/sulfur', 'railcraft:sulfur_ore')
    event.add('c:ores/firestone', 'railcraft:firestone_ore')
    event.add('c:ores/yellorite', 'bigreactors:yellorite_ore')
    event.add('c:ores/uranium', 'bigreactors:yellorite_ore')
    event.add('c:ores/benitoite', 'bigreactors:benitoite_ore')
    event.add('c:ores/draconium', [
        'draconicevolution:draconium_ore',
        'draconicevolution:deepslate_draconium_ore'
    ])
})
