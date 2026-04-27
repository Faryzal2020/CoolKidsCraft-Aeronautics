
ServerEvents.generateData('after_mods', event => {
    const ores = ['osmium', 'iridium']
    
    ores.forEach(ore => {
        let json = {
            "type": "neoforge:remove_features",
            "biomes": "#minecraft:is_overworld",
            "features": [
                `alltheores:ore_${ore}`,
                `alltheores:ore_${ore}_middle`,
                `alltheores:ore_${ore}_buried`,
                `alltheores:ore_${ore}_placed`,
                `alltheores:${ore}_ore`,
                `alltheores:ore_${ore}_large`
            ],
            "steps": ["underground_ores"]
        }
        
        event.json(`atm10:neoforge/biome_modifier/remove_${ore}_overworld.json`, json)
        
        // Also for nether and end just in case
        let jsonNether = JSON.parse(JSON.stringify(json))
        jsonNether.biomes = "#minecraft:is_nether"
        event.json(`atm10:neoforge/biome_modifier/remove_${ore}_nether.json`, jsonNether)
        
        let jsonEnd = JSON.parse(JSON.stringify(json))
        jsonEnd.biomes = "#minecraft:is_end"
        event.json(`atm10:neoforge/biome_modifier/remove_${ore}_end.json`, jsonEnd)
    })
})
