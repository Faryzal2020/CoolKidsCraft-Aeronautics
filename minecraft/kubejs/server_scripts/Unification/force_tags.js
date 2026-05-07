// priority: 100

ServerEvents.tags('item', event => {
    const materials = [
        'sulfur', 'salt', 'iron', 'gold', 'copper', 'tin', 'lead', 'silver', 
        'nickel', 'aluminum', 'zinc', 'uranium', 'platinum', 'osmium', 
        'bauxite', 'tungsten', 'iridium', 'titanium', 'coal', 'diamond', 
        'emerald', 'lapis', 'redstone', 'quartz', 'rubber', 'silicon'
    ];
    
    const types = {
        'dusts': 'dust',
        'ingots': 'ingot',
        'nuggets': 'nugget',
        'ores': 'ore',
        'raw_materials': 'raw',
        'storage_blocks': 'block',
        'gears': 'gear',
        'plates': 'plate',
        'rods': 'rod',
        'wires': 'wire'
    };

    const targetMods = ['tfmg', 'enderio', 'railcraft', 'create', 'oritech', 'actuallyadditions', 'pneumaticcraft', 'utilitarian', 'productivebees'];

    // For every item in these mods, check if it fits our pattern (e.g. sulfur_dust)
    // and FORCE it into the c:dusts/sulfur tag.
    // This absolutely guarantees that when global_replacements.js injects this tag into a recipe,
    // the tag is not empty, preventing the NeoForge "ingredient is not allowed to be empty!" crash.
    
    targetMods.forEach(mod => {
        Ingredient.of(`@${mod}`).getItemIds().forEach(itemStr => {
            itemStr = String(itemStr);
            let idPart = itemStr.split(':')[1];
            
            for (let mat of materials) {
                for (let type of Object.keys(types)) {
                    let typeName = types[type];
                    if (idPart === `${mat}_${typeName}` || idPart === `${typeName}_${mat}` || (typeName === 'raw' && idPart === `raw_${mat}`)) {
                        event.add(`c:${type}/${mat}`, itemStr);
                    }
                }
            }
        });
    });
    
    // Explicit edge case
    event.add('c:dusts/coal', 'enderio:powdered_coal');
});
