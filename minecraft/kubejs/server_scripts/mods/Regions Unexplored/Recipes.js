//This file adds a recipe to craft Redstone from the Pointed Redstone item
ServerEvents.recipes(event => {
  event.shapeless(
    Item.of('minecraft:redstone', 1),
    [
      'regions_unexplored:pointed_redstone'
      ]
    )
})
