// priority: 100

// Extensible tag alignment for Almost Unified
// If you have items using a mod-specific tag (like #c:silver_raw)
// this script pushes them into the canonical tag (#c:raw_materials/silver)
// so Almost Unified can properly process and unify them.

const UNIFICATION_MATERIALS = [
    'lead',
    'silver',
    'tin',
    'zinc',
    'aluminum',
    'nickel',
    'copper',
    'iron',
    'gold',
    'platinum',
    'uranium',
    'osmium',
    'bauxite',
    'tungsten',
    'iridium',
    'titanium'
];

const CANONICAL_TYPES = {
    'raw_materials': [
        'c:raw_{material}', 
        'c:{material}_raw', 
        'forge:raw_materials/{material}',
        'c:raw_materials/{material}s'
    ],
    'ingots': [
        'c:{material}_ingots',
        'forge:ingots/{material}',
        'c:ingots/{material}s'
    ],
    'ores': [
        'c:{material}_ores',
        'forge:ores/{material}',
        'c:ores/{material}s'
    ],
    'dusts': [
        'c:{material}_dusts',
        'forge:dusts/{material}',
        'c:dusts/{material}s'
    ],
    'nuggets': [
        'c:{material}_nuggets',
        'forge:nuggets/{material}',
        'c:nuggets/{material}s'
    ]
};

ServerEvents.tags('item', event => {
    
    // 1. Automated Tag Forwarding
    UNIFICATION_MATERIALS.forEach(material => {
        Object.entries(CANONICAL_TYPES).forEach(([type, misalignedPatterns]) => {
            let standardTag = `c:${type}/${material}`;
            
            misalignedPatterns.forEach(pattern => {
                let badTag = pattern.replace('{material}', material);
                if (badTag !== standardTag) {
                    // Forward all items from the bad tag into the canonical standard tag
                    event.add(standardTag, `#${badTag}`);
                }
            });
        });
    });

    // 2. Manual Additions (if needed for highly specific edge cases)
    // event.add('c:raw_materials/lead', 'somemod:weird_lead_item');

});
