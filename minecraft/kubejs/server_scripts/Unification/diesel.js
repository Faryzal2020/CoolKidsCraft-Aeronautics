
ServerEvents.recipes(event => {
    const TARGET_DIESEL = 'oritech:still_diesel'
    const SOURCE_DIESELS = ['pneumaticcraft:diesel', 'tfmg:diesel']
    
    // Scan all recipes that produce PneumaticCraft or TFMG diesel
    // and replace them with Oritech Still Diesel
    event.forEachRecipe({}, recipe => {
        let json = recipe.json
        let modified = false
        
        // Helper to recursively find and replace diesel IDs in output objects
        const patchDieselOutput = (obj) => {
            if (!obj || typeof obj !== 'object' || obj.isJsonPrimitive()) return
            
            if (obj.isJsonObject()) {
                // Check 'fluid' field (Commonly used by Oritech, TFMG, PNC, MI)
                if (obj.has('fluid')) {
                    let field = obj.get('fluid')
                    if (field.isJsonPrimitive()) {
                        let fId = field.getAsString()
                        if (SOURCE_DIESELS.includes(fId)) {
                            obj.addProperty('fluid', TARGET_DIESEL)
                            modified = true
                        }
                    }
                }
                
                // Check 'id' field (Commonly used by EnderIO and some Create/Thermal addons)
                if (obj.has('id')) {
                    let field = obj.get('id')
                    if (field.isJsonPrimitive()) {
                        let id = field.getAsString()
                        if (SOURCE_DIESELS.includes(id)) {
                            obj.addProperty('id', TARGET_DIESEL)
                            modified = true
                        }
                    }
                }
                
                // Recursive step to handle nested lists (multi-output machines)
                obj.entrySet().forEach(entry => {
                    patchDieselOutput(entry.getValue())
                })
            } else if (obj.isJsonArray()) {
                obj.forEach(item => {
                    patchDieselOutput(item)
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
                patchDieselOutput(json.get(key))
            }
        })
        
        // In KubeJS 6/21 (Neoforge), modifying the JSON in forEachRecipe updates the recipe
    })
    
    console.log(`[Diesel Unification] Applied output patches for: ${SOURCE_DIESELS.join(', ')} -> ${TARGET_DIESEL}`)
})
