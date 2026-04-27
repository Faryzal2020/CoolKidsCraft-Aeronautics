ServerEvents.recipes(event => {
    // Unify TFMG fluid inputs to use common tags
    // This targets the 1.21 Neoforge fluid ingredient structure used by TFMG.
    // Only target TFMG recipes to avoid errors with other mods
    event.forEachRecipe({ mod: 'tfmg' }, recipe => {
        let json = recipe.json
        
        // Fluid ingredients in TFMG are typically in the 'ingredients' array
        if (json.has('ingredients')) {
            json.get('ingredients').forEach(ing => {
                if (ing.isJsonObject() && ing.has('fluid')) {
                    // Use String() and remove quotes for safe parsing in 1.21
                    let fluidId = String(ing.get('fluid')).replace(/"/g, '')
                    
                    // Crude Oil Unification
                    if (fluidId == 'tfmg:crude_oil') {
                        ing.addProperty('tag', 'c:crude_oil')
                        ing.addProperty('type', 'neoforge:tag')
                        ing.remove('fluid')
                    }
                    
                    // Heavy Oil Unification
                    if (fluidId == 'tfmg:heavy_oil') {
                        ing.addProperty('tag', 'c:heavy_oil')
                        ing.addProperty('type', 'neoforge:tag')
                        ing.remove('fluid')
                    }
                }
            })
        }
    })
})
