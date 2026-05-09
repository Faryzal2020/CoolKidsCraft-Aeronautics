// priority: 100
ServerEvents.tags('fluid', event => {
    const moltenMetals = [
        'iron', 'gold', 'copper', 'tin', 'lead', 'silver', 'nickel', 
        'aluminum', 'zinc', 'steel', 'bronze', 'electrum', 'constantan', 
        'platinum', 'brass', 'invar', 'iridium', 'uranium', 'osmium',
        'netherite', 'cast_iron'
    ];

    moltenMetals.forEach(metal => {
        let tag = `c:molten_${metal}`;
        // Ensure all variants are in the same tag
        event.add(tag, [
            `productivemetalworks:molten_${metal}`,
            `tfmg:molten_${metal}`,
            `createbigcannons:molten_${metal}`,
            `create:molten_${metal}`,
            `oritech:molten_${metal}`
        ]);
    });
});

ServerEvents.tags('item', event => {
    const moltenMetals = [
        'iron', 'gold', 'copper', 'tin', 'lead', 'silver', 'nickel', 
        'aluminum', 'zinc', 'steel', 'bronze', 'electrum', 'constantan', 
        'platinum', 'brass', 'invar', 'iridium', 'uranium', 'osmium',
        'netherite', 'cast_iron'
    ];

    moltenMetals.forEach(metal => {
        let bucketTag = `c:buckets/molten_${metal}`;
        event.add(bucketTag, [
            `productivemetalworks:molten_${metal}_bucket`,
            `tfmg:molten_${metal}_bucket`,
            `createbigcannons:molten_${metal}_bucket`,
            `create:molten_${metal}_bucket`,
            `oritech:molten_${metal}_bucket`
        ]);
    });
});
