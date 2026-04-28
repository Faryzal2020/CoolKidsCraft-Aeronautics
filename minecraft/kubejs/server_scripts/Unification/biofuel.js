
ServerEvents.recipes(event => {
    const TARGET_BIOFUEL = 'oritech:still_biofuel'
    const SOURCE_BIOFUELS = ['createaddition:bioethanol']
    
    // Scan all recipes that produce Create Addition bioethanol
    // and replace them with Oritech Still Biofuel
    event.forEachRecipe({}, recipe => {
        let json = recipe.json
        let modified = false
        
        // Helper to recursively find and replace biofuel IDs in output objects
        const patchBiofuelOutput = (obj) => {
            if (!obj || typeof obj !== 'object' || obj.isJsonPrimitive()) return
            
            if (obj.isJsonObject()) {
                // Check 'fluid' field (Commonly used by Oritech, TFMG, PNC, MI)
                if (obj.has('fluid')) {
                    let field = obj.get('fluid')
                    if (field.isJsonPrimitive()) {
                        let fId = field.getAsString()
                        if (SOURCE_BIOFUELS.includes(fId)) {
                            obj.addProperty('fluid', TARGET_BIOFUEL)
                            modified = true
                        }
                    }
                }
                
                // Check 'id' field (Commonly used by EnderIO and some Create/Thermal addons)
                if (obj.has('id')) {
                    let field = obj.get('id')
                    if (field.isJsonPrimitive()) {
                        let id = field.getAsString()
                        if (SOURCE_BIOFUELS.includes(id)) {
                            obj.addProperty('id', TARGET_BIOFUEL)
                            modified = true
                        }
                    }
                }
                
                // Recursive step to handle nested lists (multi-output machines)
                obj.entrySet().forEach(entry => {
                    patchBiofuelOutput(entry.getValue())
                })
            } else if (obj.isJsonArray()) {
                obj.forEach(item => {
                    patchBiofuelOutput(item)
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
                patchBiofuelOutput(json.get(key))
            }
        })
    })
    
    console.log(`[Biofuel Unification] Applied output patches for: ${SOURCE_BIOFUELS.join(', ')} -> ${TARGET_BIOFUEL}`)
})
