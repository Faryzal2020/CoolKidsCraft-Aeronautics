Supported recipe types:

 
- createCrushing
- createCutting
- createMilling
- createBasin
- createMixing (supports .heated() and .superheated())
- createCompacting (supports .heated() and .superheated())
- createPressing
- createSandpaperPolishing
- createSplashing (Bulk Washing)
- createDeploying
- createFilling
- createEmptying

Note: Bulk Smoking = vanilla smoking and Bulk Blasting = vanilla blasting recipe types.

event.recipes.createCrushing(output[], input[])
Output doesn't have to be array. It can be either items or fluids
Input doesn't have to be array. It can be either ingredients or Fluid.of('minecraft:water', 1000) or {fluidTag: 'some:fluid_tag', amount: 1000}

- createMechanicalCrafting

event.recipes.createMechanicalCrafting(output, pattern[], {patternKey: input})
This recipe type is the same as regular crafting table shaped recipe

- createSequencedAssembly

event.recipes.createSequencedAssembly(output[], input, sequence[]) 
// output[] are your output items
// input is your input item
// sequence[] is an array of sequences. These sequences are "regular" recipes that are supported.
Examples:

event.recipes.createCrushing([
  '2x minecraft:cobblestone',
  'minecraft:redstone',
  Item.of('minecraft:redstone').withChance(0.5)
], 'minecraft:redstone_ore')

 

event.recipes.createMixing('create:chromatic_compound', [
  '#forge:dusts/glowstone',
  '#forge:dusts/glowstone',
  '#forge:dusts/glowstone',
  'create:powdered_obsidian',
  'create:powdered_obsidian',
  'create:powdered_obsidian',
  'create:polished_rose_quartz'
]).superheated()

 

event.recipes.createFilling('create:blaze_cake', [
  'create:blaze_cake_base',
  Fluid.of('minecraft:lava', 250)
])

 

event.recipes.createEmptying([
  'minecraft:glass_bottle',
  Fluid.of('create:honey', 250)
], 'minecraft:honey_bottle')
 

event.recipes.createMechanicalCrafting('minecraft:piston', [
  'CCCCC',
  'CPIPC',
  'CPRPC'
], {
  C: '#forge:cobblestone',
  P: '#minecraft:planks',
  R: '#forge:dusts/redstone',
  I: '#forge:ingots/iron'
})

 

event.recipes.createSequencedAssembly([ // start the recipe
Item.of('6x create:large_cogwheel').withChance(32.0), // have this item be an output with a certain chance
Item.of('create:brass_ingot').withChance(2.0), // have this item be an output with a certain chance
'minecraft:andesite', // have this item be a guaranteed output
'create:cogwheel', // have this item be a guaranteed output
'minecraft:stick', // have this item be a guaranteed output
'minecraft:iron_nugget' // have this item be a guaranteed output
], 'create:brass_ingot', [ // 'create:brass_ingot' is the input.
// the transitional item set by "transitionalItem('create:incomplete_large_cogwheel')" is the item that will be used during the recipe as the item that the input is using to transition to the output.
event.recipes.createDeploying('create:incomplete_large_cogwheel', ['create:incomplete_large_cogwheel', '#minecraft:planks']), // like a normal recipe function, is used as a sequence step in this array. Input and output have the transitional item
event.recipes.createDeploying('create:incomplete_large_cogwheel', ['create:incomplete_large_cogwheel', '#minecraft:wooden_buttons']), // like a normal recipe function, is used as a sequence step in this array. Input and output have the transitional item
event.recipes.createCutting('create:incomplete_large_cogwheel', 'create:incomplete_large_cogwheel').processingTime(50) // like a normal recipe function, is used as a sequence step in this array. Input and output have the transitional item
]).transitionalItem('create:incomplete_large_cogwheel').loops(6) // set the transitional item and the loops (amount of repetitions)

 

If you want to use your own transitional item in sequenced_assembly recipes, you must register it in startup event:

 

onEvent('item.registry', event => {

  // Texture for this item goes in kubejs/assets/kubejs/textures/item/my_part.png

  event.create('my_part', 'create:sequenced_assembly').displayName('My Part')

})

 

Then you would use …transitionalItem('kubejs:my_part')…

 

Note! Mysterious Conversion recipes are client side only, so the only way to add them currently is using reflection with this code in client scripts (outside any event):

let MysteriousItemConversionCategory = java('com.simibubi.create.compat.jei.category.MysteriousItemConversionCategory')

let ConversionRecipe = java('com.simibubi.create.compat.jei.ConversionRecipe')

 

MysteriousItemConversionCategory.RECIPES.add(ConversionRecipe.create('minecraft:apple', 'minecraft:carrot'))

MysteriousItemConversionCategory.RECIPES.add(ConversionRecipe.create('minecraft:golden_apple', 'minecraft:golden_carrot'))