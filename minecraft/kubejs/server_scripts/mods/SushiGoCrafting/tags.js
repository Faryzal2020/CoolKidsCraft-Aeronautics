ServerEvents.tags('item', event => {
//This file intended to help SushiGoCrafting crops / items be used in place of other crops / items in recipes, mirroring tags currently applied to crops / items of the same in-game name or intended purpose.
//It's quite possible that many of these tags are redundant somehow
//Soybean
    event.add('c:crops', 'sushigocrafting:soy_bean')
    event.add('c:crops/soybean', 'sushigocrafting:soy_bean')
    event.add('c:flour_plants/soybean', 'sushigocrafting:soy_bean')
    event.add('c:flour_plants', 'sushigocrafting:soy_bean')
    event.add('c:grain/soybean', 'sushigocrafting:soy_bean')
    event.add('c:grain', 'sushigocrafting:soy_bean')
//Rice
    event.add('twilightforest:tiny_bird_tempt_items', 'sushigocrafting:rice')
    event.add('minecraft:chicken_food', 'sushigocrafting:rice')
    event.add('cookingforblockheads:ingredients', 'sushigocrafting:rice')
    event.add('twilightforest:raven_tempt_items', 'sushigocrafting:rice')
    event.add('c:crops/grain', 'sushigocrafting:rice')
    event.add('minecraft:parrot_food', 'sushigocrafting:rice')
    event.add('twilightforest:squirrel_tempt_items', 'sushigocrafting:rice')
    event.add('c:animal_foods', 'sushigocrafting:rice')
    event.add('c:paper_plants/rice', 'sushigocrafting:rice')
    event.add('c:paper_plants', 'sushigocrafting:rice')
    event.add('c:protein', 'sushigocrafting:rice')
    event.add('c:flour_plants', 'sushigocrafting:rice')
    event.add('c:carbs/rice', 'sushigocrafting:rice')
    event.add('c:flour_plants/rice', 'sushigocrafting:rice')
    event.add('c:grain/rice', 'sushigocrafting:rice')
    event.add('c:carbs', 'sushigocrafting:rice')
    event.add('c:vinegar_ingredients', 'sushigocrafting:rice')
    event.add('c:grain', 'sushigocrafting:rice')
    event.add('c:protein/rice', 'sushigocrafting:rice')
//Avocado
    event.add('c:crops', 'sushigocrafting:avocado')
    event.add('c:crops/avocado', 'sushigocrafting:avocado')
    event.add('c:egg', 'sushigocrafting:avocado')
    event.add('c:egg/avocado', 'sushigocrafting:avocado')
    event.add('c:vegetables', 'sushigocrafting:avocado')
    event.add('c:vegetables/avocado', 'sushigocrafting:avocado')
    if (Platform.isLoaded('minecolonies')) {
        event.add('minecolonies:blacksmith_ingredient_excluded', 'sushigocrafting:avocado')
        event.add('minecolonies:compostables', 'sushigocrafting:avocado')
    }
//Cucumber
    event.add('c:vegetables', 'sushigocrafting:cucumber')
    event.add('c:vegetables/cucumber', 'sushigocrafting:cucumber')
    if (Platform.isLoaded('minecolonies')) {
        event.add('minecolonies:compostables', 'sushigocrafting:cucumber')
    }
    event.add('c:salad_ingredients/cucumber', 'sushigocrafting:cucumber')
})

