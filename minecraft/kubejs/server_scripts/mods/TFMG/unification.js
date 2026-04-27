ServerEvents.recipes(event => {
    // Unify TFMG fluid inputs to use common tags
    // Strict filtering by mod and TFMG-specific recipe types
    event.forEachRecipe({ mod: 'tfmg' }, recipe => {
        let json = recipe.json
        let recipeType = String(recipe.type)

        // Only process TFMG-specific machine types to avoid any compatibility recipe issues
        if (!recipeType.includes('tfmg')) return
        
        // Fluid ingredients in TFMG are typically in the 'ingredients' array
        if (json.has('ingredients')) {
            json.get('ingredients').forEach(ing => {
                if (ing.isJsonObject() && ing.has('fluid')) {
                    // Use String() and remove quotes for safe parsing in 1.21
                    let fluidId = String(ing.get('fluid')).replace(/"/g, '')
                    
                    // Crude Oil Unification
                    if (fluidId == 'tfmg:crude_oil' || fluidId == 'pneumaticcraft:oil' || fluidId == 'pneumaticcraft:crude_oil') {
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
