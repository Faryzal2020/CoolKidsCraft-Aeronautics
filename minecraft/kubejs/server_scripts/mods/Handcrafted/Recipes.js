

ServerEvents.recipes(event => {
  event.forEachRecipe({ id: /handcrafted:.*_sheet$/ }, (recipe) => {
    let temp_array = JSON.parse(recipe.json).ingredients
    temp_array.push(temp_array[0])
    recipe.set("ingredients", temp_array)
    recipe.set("result", recipe.get("result").withCount(10))
  })
})


