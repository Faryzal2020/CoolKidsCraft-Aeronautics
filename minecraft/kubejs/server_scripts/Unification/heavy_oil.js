
ServerEvents.recipes(event => {
    const TARGET_HEAVY_OIL = 'oritech:still_heavy_oil'
    const SOURCE_HEAVY_OILS = ['tfmg:heavy_oil']
    
    // Scan all recipes that produce TFMG heavy oil
    // and replace them with Oritech Still Heavy Oil
    event.forEachRecipe({}, recipe => {
        let json = recipe.json
        let modified = false
        
        // Helper to recursively find and replace heavy oil IDs in output objects
        const patchHeavyOilOutput = (obj) => {
            if (!obj || typeof obj !== 'object' || obj.isJsonPrimitive()) return
            
            if (obj.isJsonObject()) {
                // Check 'fluid' field (Commonly used by Oritech, TFMG, PNC, MI)
                if (obj.has('fluid')) {
                    let field = obj.get('fluid')
                    if (field.isJsonPrimitive()) {
                        let fId = field.getAsString()
                        if (SOURCE_HEAVY_OILS.includes(fId)) {
                            obj.addProperty('fluid', TARGET_HEAVY_OIL)
                            modified = true
                        }
                    }
                }
                
                // Check 'id' field (Commonly used by EnderIO and some Create/Thermal addons)
                if (obj.has('id')) {
                    let field = obj.get('id')
                    if (field.isJsonPrimitive()) {
                        let id = field.getAsString()
                        if (SOURCE_HEAVY_OILS.includes(id)) {
                            obj.addProperty('id', TARGET_HEAVY_OIL)
                            modified = true
                        }
                    }
                }
                
                // Recursive step to handle nested lists (multi-output machines)
                obj.entrySet().forEach(entry => {
                    patchHeavyOilOutput(entry.getValue())
                })
            } else if (obj.isJsonArray()) {
                obj.forEach(item => {
                    patchHeavyOilOutput(item)
                })
            }
        }
        
        // Targeted output keys for a wide variety of machine recipes
        const outputKeys = [
            'results', 
            'output', 
            'outputs', 
            'fluidOutput', 
            'fluidOutputs', 
            'fluid_output', 
            'fluid_outputs'
        ]
        
        outputKeys.forEach(key => {
            if (json.has(key)) {
                patchHeavyOilOutput(json.get(key))
            }
        })
    })
    
    console.log(`[Heavy Oil Unification] Applied output patches for: ${SOURCE_HEAVY_OILS.join(', ')} -> ${TARGET_HEAVY_OIL}`)
})
