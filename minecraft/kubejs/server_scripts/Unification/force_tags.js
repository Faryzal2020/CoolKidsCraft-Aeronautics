// priority: 100

const MATERIALS = [
    'sulfur', 'salt', 'iron', 'gold', 'copper', 'tin', 'lead', 'silver',
    'nickel', 'aluminum', 'zinc', 'uranium', 'platinum', 'osmium',
    'bauxite', 'tungsten', 'iridium', 'titanium', 'coal', 'diamond',
    'emerald', 'lapis', 'redstone', 'quartz', 'rubber', 'silicon', 'cast_iron'
];

const TYPES = {
    'dusts': 'dust',
    'ingots': 'ingot',
    'nuggets': 'nugget',
    'ores': 'ore',
    'raw_materials': 'raw',
    'storage_blocks': 'block',
    'gears': 'gear',
    'plates': 'plate',
    'rods': 'rod',
    'wires': 'wire',
    'clumps': 'clump'
};

const TARGET_MODS = [
    'tfmg', 'enderio', 'railcraft', 'create', 'oritech', 'actuallyadditions', 'createbigcannons',
    'pneumaticcraft', 'utilitarian', 'productivebees', 'silentgems', 'iceandfire', 'createpropulsion'
];

function applyForceTags(event, isBlock) {
    TARGET_MODS.forEach(mod => {
        let registry = isBlock ? 'block' : 'item';
        let ids = Ingredient.of(`@${mod}`).getItemIds();

        ids.forEach(idStr => {
            idStr = String(idStr);
            let idPart = idStr.split(':')[1];

            for (let mat of MATERIALS) {
                for (let type of Object.keys(TYPES)) {
                    let typeName = TYPES[type];

                    // Skip types that don't make sense for blocks
                    if (isBlock && type !== 'ores' && type !== 'storage_blocks') continue;

                    let match = idPart === `${mat}_${typeName}` ||
                        idPart === `${typeName}_${mat}` ||
                        idPart === `deepslate_${mat}_${typeName}` ||
                        idPart === `deepslate_${typeName}_${mat}` ||
                        (typeName === 'raw' && idPart === `raw_${mat}`);

                    if (match) {
                        event.add(`c:${type}/${mat}`, idStr);
                    }
                }
            }
        });
    });
}

ServerEvents.tags('item', event => {
    let startTime = Date.now();
    applyForceTags(event, false);

    // Explicit edge case
    event.add('c:dusts/coal', 'enderio:powdered_coal');
    
    let duration = Date.now() - startTime;
    console.log(`[Force Tags] Completed item tags in ${duration}ms`);
});

ServerEvents.tags('block', event => {
    let startTime = Date.now();
    applyForceTags(event, true);
    
    let duration = Date.now() - startTime;
    console.log(`[Force Tags] Completed block tags in ${duration}ms`);
});

