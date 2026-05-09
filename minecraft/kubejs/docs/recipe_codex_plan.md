# Project: Recipe Codex Scanner

## Goal
Create a technical reference (Codex) that maps out the JSON structures and schemas of all modded recipe types. This will eliminate the need for hardcoded "strict schema" lists in unification scripts and provide a single source of truth for how different mods handle inputs, outputs, and fluids.

## Proposed Strategy

### 1. The Scanner Script
A KubeJS script that runs during `ServerEvents.recipes` to analyze the registry.
- **Iteration**: Use `event.forEachRecipe({}, recipe => { ... })`.
- **Deduplication**: Only analyze the first 3-5 recipes of any unique `type` to identify patterns.
- **Key Detection**:
    - **Inputs**: Detect keys containing tags (`#`), objects with `item`/`tag` keys, or keys inside arrays named `ingredients`/`inputs`.
    - **Outputs**: Detect keys containing concrete item IDs that appear in the results section.
    - **Fluids**: Identify objects with an `amount` key that corresponds to a valid fluid ID.
- **Schema Mapping**: Map out if a type uses "id" vs "item", "fluid" vs "fluid_id", and if it supports tags.

### 2. The Codex File
The scanner will output a JSON file to `kubejs/recipe_codex.json`.
Example structure:
```json
{
  "tfmg:industrial_blasting": {
    "mod": "tfmg",
    "inputs": ["ingredients"],
    "outputs": ["results"],
    "fluid_keys": ["id"],
    "supports_tags": true
  },
  "create:mixing": {
    "mod": "create",
    "inputs": ["ingredients"],
    "outputs": ["results"],
    "fluid_keys": ["fluid"],
    "supports_tags": true
  }
}
```

### 3. Usage in Unification
Update `global_replacements.js` and `fluid_adjustments.js` to load this JSON:
- Instead of: `if (recipeId.startsWith('tfmg:')) { ... }`
- Use: `if (Codex[recipeType].fluid_keys.includes('id')) { ... }`

## Work Items
- [ ] Implement `RecipeAnalyzer` utility class to guess schema roles.
- [ ] Create `ServerEvents.recipes` scanner script.
- [ ] Implement JSON export logic using `JsonIO`.
- [ ] Refactor `fluid_adjustments.js` to use the Codex lookup.

## Contextual Notes
- **NeoForge 1.21.1**: Pay close attention to how `FluidStack` vs `FluidIngredient` is serialized in different mods.
- **Strict Parsers**: Note which mods (like EnderIO) crash if "id" is used where "item" is expected.
