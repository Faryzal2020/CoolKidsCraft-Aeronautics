
ServerEvents.recipes(event => {
    const BIOFUEL_TAG = '#c:biofuel'
    
    // 1. Search the members of #c:biofuel tag
    // We use a list to store IDs for easy checking later
    let biofuelIds = []
    
    try {
        // In KubeJS 21, Ingredient.of() can handle fluid tags
        let fluids = Ingredient.of(BIOFUEL_TAG).getFluids()
        fluids.forEach(f => {
            if (f.id && !biofuelIds.includes(f.id)) {
                biofuelIds.push(f.id)
            }
        })
    } catch (e) {
        console.warn(`[Biofuel Patch] Could not retrieve fluid members for ${BIOFUEL_TAG}. Tags might not be initialized for fluids in this way, or tag is empty.`)
    }

    // fallback: if getFluids() is empty, we can't "search members" effectively 
    // unless we iterate all fluids. But the user said "searches the members", 
    // so we assume they want this dynamic behavior.
    
    if (biofuelIds.length > 0) {
        console.log(`[Biofuel Patch] Found ${biofuelIds.length} members in ${BIOFUEL_TAG}: ${biofuelIds.join(', ')}`)
        
        // 2. For each item (fluid) of that tag, search recipe that uses that item as fluidInput
        // We iterate through all recipes and check their fluid inputs against our list.
        event.forEachRecipe({}, recipe => {
            let json = recipe.json
            let modified = false
            
            // Helper to recursively search and replace fluid IDs in input objects
            const patchFluidInput = (obj) => {
                if (!obj || typeof obj !== 'object' || obj.isJsonPrimitive()) return
                
                if (obj.isJsonObject()) {
                    // Check for 'fluid' field which is standard for most modded fluid inputs
                    if (obj.has('fluid')) {
                        let field = obj.get('fluid')
                        if (field.isJsonPrimitive()) {
                            let fId = field.getAsString()
                            if (biofuelIds.includes(fId)) {
                                // 3. Replace the fluidInput of the recipe to #c:biofuel
                                obj.addProperty('fluid', BIOFUEL_TAG)
                                modified = true
                            }
                        }
                    }
                    // Recurse into children to catch nested inputs (like in 'ingredients' arrays)
                    obj.entrySet().forEach(entry => {
                        patchFluidInput(entry.getValue())
                    })
                } else if (obj.isJsonArray()) {
                    obj.forEach(item => {
                        patchFluidInput(item)
                    })
                }
            }
            
            // Define targeted input fields for various mods
            // Oritech: 'fluidInput'
            // EnderIO: 'input'
            // Thermal/Create/others: 'ingredients' or 'fluid_input'
            const inputFields = ['fluidInput', 'input', 'ingredients', 'fluid_input', 'fluid_inputs']
            
            inputFields.forEach(key => {
                if (json.has(key)) {
                    patchFluidInput(json.get(key))
                }
            })
            
            // If the recipe was modified, those changes are reflected in the recipe object.
            // In KubeJS 6/21 for Neoforge, modifying the json object in forEachRecipe is sufficient.
        })
        
        console.log(`[Biofuel Patch] Completed patching recipes for ${BIOFUEL_TAG}`)
    } else {
        console.warn(`[Biofuel Patch] No fluids found in tag ${BIOFUEL_TAG}. Ensure your tag patch runs before or during the tag loading phase.`)
    }
})
