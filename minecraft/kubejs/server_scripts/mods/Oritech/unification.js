ServerEvents.recipes(event => {
    // Unify Oritech fluid inputs to use common tags
    event.forEachRecipe({ mod: 'oritech' }, recipe => {
        let json = recipe.json
        
        // Handle Oritech-specific 'fluidInput' field (e.g. Refinery)
        if (json.has('fluidInput')) {
            let fi = json.get('fluidInput')
            if (fi.has('fluid')) {
                let fluidId = String(fi.get('fluid')).replace(/"/g, '')
                if (fluidId == 'pneumaticcraft:oil' || fluidId == 'pneumaticcraft:crude_oil' || fluidId == 'tfmg:crude_oil' || fluidId == 'modern_industrialization:crude_oil') {
                    fi.addProperty('fluid', 'c:crude_oil')
                    // Note: Oritech recipes often support tags via the 'fluid' string if prefixed with #, 
                    // but it depends on the mod's implementation of FluidIngredient.
                    // If Oritech fails with a tag here, we might need a different approach.
                }
            }
        }

        // Handle standard 'ingredients' array (e.g. Centrifuge or Mixing)
        if (json.has('ingredients')) {
            json.get('ingredients').forEach(ing => {
                if (ing.isJsonObject() && ing.has('fluid')) {
                    let fluidId = String(ing.get('fluid')).replace(/"/g, '')
                    
                    if (fluidId == 'pneumaticcraft:oil' || fluidId == 'pneumaticcraft:crude_oil' || fluidId == 'tfmg:crude_oil' || fluidId == 'modern_industrialization:crude_oil') {
                        ing.addProperty('tag', 'c:crude_oil')
                        ing.addProperty('type', 'neoforge:tag')
                        ing.remove('fluid')
                    }
                }
            })
        }
    })
})
