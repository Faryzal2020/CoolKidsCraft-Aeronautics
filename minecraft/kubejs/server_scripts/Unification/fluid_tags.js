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


    event.remove('c:biodiesel', 'oritech:still_biofuel')
    const fuels = [
        { id: "railcraft:creosote", tags: ["tfmg:blast_stove_fuel", "tfmg:flammable", "c:fuel"] }, // already have c:creosote
        { id: "tfmg:ethylene", tags: ["c:fuels/ethylene", "c:ethylene", "c:fuel"] },
        { id: "pneumaticcraft:gasoline", tags: ["tfmg:firebox_fuel", "tfmg:flammable", "c:fuel", "c:gasoline"] },
        { id: "pneumaticcraft:kerosene", tags: ["tfmg:firebox_fuel", "tfmg:flammable", "c:fuel", "c:fuels/kerosene"] },
        { id: "oritech:still_naphtha", tags: ["tfmg:firebox_fuel", "tfmg:flammable", "c:fuel", "c:fuels/naphtha", "c:naphtha"] },
        { id: "pneumaticcraft:lpg", tags: ["tfmg:firebox_fuel", "tfmg:flammable", "c:fuel", "c:fuels/lpg", "c:lpg"] },
        { id: "oritech:still_diesel", tags: ["tfmg:firebox_fuel", "tfmg:flammable", "c:fuel", "c:fuels/diesel"] },
        { id: "enderio:fluid_rocket_fuel_still", tags: ["tfmg:firebox_fuel", "tfmg:flammable", "c:fuel", "c:fuels/rocket_fuel"] },
        { id: "oritech:still_biofuel", tags: ["tfmg:firebox_fuel", "tfmg:flammable", "c:fuel", "c:fuels/biofuel"] },
        { id: "oritech:still_fuel", tags: ["tfmg:firebox_fuel", "tfmg:flammable", "c:fuel", "c:fuels/turbofuel"] },
        { id: "createpropulsion:turpentine", tags: ["tfmg:firebox_fuel", "tfmg:flammable", "c:turpentine", "c:fuels/turpentine"] },
        { id: "pneumaticcraft:biodiesel", tags: ["tfmg:firebox_fuel", "tfmg:flammable", "c:fuel", "c:fuels/biodiesel"] },
        { id: "tfmg:sulfuric_acid", tags: ["c:sulfuric_acid"] },
        { id: "railcraft:steam", tags: ["c:steam"] }
    ] // some fluid already have their correct tags like c:turbofuel so i didn't put it on the tag list

    fuels.forEach(fuel => {
        fuel.tags.forEach(tag => {
            event.add(tag, fuel.id);
        });
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

    event.add('c:buckets/creosote', [
        'railcraft:creosote_bucket'
    ])
});
