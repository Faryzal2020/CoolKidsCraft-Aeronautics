ServerEvents.recipes(event => {
    // Unify Oritech fluid inputs to use common tags
    // Strict filtering by mod and common Oritech recipe types
    event.forEachRecipe({ mod: 'oritech' }, recipe => {
        let json = recipe.json
        let recipeType = recipe.json.has('type') ? String(recipe.json.get('type').getAsString()) : ''

        // Only process Oritech machines that we know use fluids
        if (!recipeType.includes('oritech')) return

        // Handle Oritech-specific 'fluidInput' field (e.g. Refinery)
        if (json.has('fluidInput')) {
            let fi = json.get('fluidInput')
            if (fi.has('fluid')) {
                let fluidId = String(fi.get('fluid')).replace(/"/g, '')
                if (fluidId == 'pneumaticcraft:oil' || fluidId == 'pneumaticcraft:crude_oil' || fluidId == 'tfmg:crude_oil' || fluidId == 'modern_industrialization:crude_oil') {
                    fi.addProperty('tag', 'c:crude_oil')
                    fi.addProperty('type', 'neoforge:tag')
                    fi.remove('fluid')
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
