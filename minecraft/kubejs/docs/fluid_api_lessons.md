# Fluid API & Unification Lessons (NeoForge 1.21.1)

These lessons were learned while debugging fluid unification and registry access in KubeJS 1.21.1 / NeoForge.

## 1. Ingredient != Fluid
Using `Ingredient.of('#c:water')` on a fluid tag does **not** return a fluid ingredient. It returns an **Item Ingredient** (likely matching buckets).
- **Symptom**: Calling `.getFluidIds()` on the result throws a `TypeError: Cannot find function getFluidIds in object net.minecraft.world.item.crafting.Ingredient`.
- **Solution**: Use the fluid registry directly via `Utils.getRegistry('fluid')`.

## 2. Fluid Tag Syntax
- **Tags with `#`**: Strings like `#c:water` are valid for many KubeJS methods, but they are **INVALID ResourceLocations**. 
- **Symptom**: Mods that use strict NeoForge parsers (like Create's Sequenced Assembly) will crash with `java.lang.IllegalStateException: Not a valid resource location: #c:water`.
- **Solution**: For NeoForge 1.21.1 recipe JSON, use `{"tag": "c:water"}` instead of `{"fluid": "#c:water"}`.

## 3. Strict Parser & Nested Items
When modifying recipes using `recipe.json`, KubeJS often serializes item stacks as nested objects: `{"item": {"id": "mod:item", "count": 1}}`.
- **Symptom**: Create's `processing_output` component fails with `No key id in MapLike[...]` because it expects a flat structure like `{"item": "mod:item"}` or `{"id": "mod:item"}` at the top level of the result object.
- **Solution**: Deep-traverse the JSON and flatten these objects in the `results` or `outputs` arrays.

## 4. Fluid.of() Robustness
In 1.21.1, `Fluid.of('id')` can throw a `Failed to read FluidStack` exception immediately if the ID is missing or invalid (e.g. `tfmg:blast_stove_fuel`).
- **Symptom**: Script crashes during `ServerEvents.recipes`.
- **Solution**: Always wrap `Fluid.of()` in a `try-catch` block when scanning unknown recipe IDs. Use `!fluid.empty` to check for validity.

## 5. Server Registry Access
In `ServerEvents.recipes`, the `event.server` object might be undefined or behave differently.
- **Solution**: Use `Utils.server` to access the server instance and its registries reliably.
## 6. KubeJS Serialization Artifacts (`fluid_stack`)
When KubeJS serializes a fluid ingredient into JSON (e.g., during `recipe.json` access), it often adds a `"type": "fluid_stack"` field to the object.
- **Symptom**: Strict NeoForge recipe parsers (like Create's Filling or Oritech's machines) will fail with `Unknown registry key ... neoforge:fluid_ingredient_type]: minecraft:fluid_stack`.
- **Solution**: In your deep-traversal logic, if you detect `obj.fluid` and `obj.type === 'fluid_stack'`, delete the `type` key to restore a standard "Sized Fluid Ingredient" structure.

---
*Created on 2026-05-09*
