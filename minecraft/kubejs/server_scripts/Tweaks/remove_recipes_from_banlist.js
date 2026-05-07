// priority: 10

if (config) {
  let recipesToRemove = config?.server.remove_recipes_by

  if (recipesToRemove instanceof $ArrayList && !recipesToRemove.isEmpty()) {
    ServerEvents.recipes(event => {
      let modsWithCustomJSON = ["oritech", "enderio"]

      recipesToRemove.forEach(item => {
        // 1. If it's a simple string or an ID/Output object, event.remove handles it natively
        event.remove(item)

        // 2. TARGETED: Deep scan for mods that might "hide" the item in their JSON
        // We only do this if the item is a string (ID) to avoid errors
        let searchString = (typeof item === 'string') ? item : (item.output || item.id)

        if (searchString) {
          modsWithCustomJSON.forEach(modid => {
            event.forEachRecipe({ mod: modid }, recipe => {
              if (recipe.json.toString().includes(searchString)) {
                event.remove({ id: recipe.id })
              }
            })
          })
        }
      })
    })
  }
}
