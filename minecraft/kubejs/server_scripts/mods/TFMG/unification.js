ServerEvents.recipes(event => {
    // Unify TFMG fluid inputs to use common tags
    // This targets the 1.21 Neoforge fluid ingredient structure used by TFMG.
    event.forEachRecipe({}, recipe => {
        let json = recipe.json
        
        // Fluid ingredients in TFMG are typically in the 'ingredients' array
        if (json.has('ingredients')) {
            json.get('ingredients').forEach(ing => {
                if (ing.isJsonObject() && ing.has('fluid')) {
                    let fluidId = ing.get('fluid').asString()
                    
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
