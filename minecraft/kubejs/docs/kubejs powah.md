# KubeJS Powah API examples:
```
ServerEvents.recipes(event => {
    // .energizing([inputs, ...], output, energy)
    event.recipes.powah.energizing(["minecraft:cobblestone"], "minecraft:tnt", 1000);
})

PowahEvents.registerCoolants(event => {
    // .addFluid(fluid, temperature)
    event.addFluid("minecraft:lava", -10);

    // item count here is not count consumed, but rather mb of coolant produced by 1 item
    // .addSolid(solid, temperature)
    event.addSolid(Item.of("minecraft:cobblestone", 1), -10);

    // .removeFluid(fluid)
    // .removeSolid(solid)
})

PowahEvents.registerHeatSource(event => {
    // .addBlock(block, temperature)
    event.addBlock("minecraft:cobblestone", 10);

    // .addFluid(fluid, temperature)
    event.addFluid("minecraft:water", 10);

    // .removeFluid(fluid)
    event.removeFluid("minecraft:lava")
})

PowahEvents.registerMagmaticFluid(event => {
    // .add(fluid, temperature)
    event.add("minecraft:water", 10);

    // .remove(fluid)
})

PowahEvents.registerReactorFuel(event => {
    // item count here is not count consumed, but rather mb of fuel produced by 1 item
    // .add(fuel, temperature)
    event.add(Item.of("minecraft:cobblestone", 100), 700);

    // .remove(fuel)
})
```