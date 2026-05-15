# Silent Gear & Productive Metalworks Integration (1.21+)

## Overview
As of Minecraft 1.21.1, the integration between **Silent Gear** and **Productive Metalworks** (or **SgearMetalworks**) is highly dynamic. Contrary to older modding knowledge, you do **not** need to manually define casting recipes for every individual tool part (Sword Blades, Pickaxe Heads, etc.) if certain conditions are met.

## How Dynamic Casting Works
The integration mod automatically scans for registered Silent Gear materials and matching molten fluids. If it finds a pair, it populates the Casting Table/Basin with recipes for all available Silent Gear parts.

### Requirements for Automatic Recipes:
1.  **Silent Gear Material Definition**: A material JSON must exist (either in the Silent Gear JAR or your `kubejs/data/silentgear/silentgear_materials/` folder).
2.  **Valid Ingot/Item**: The material's `ingredient` (usually a tag like `#c:ingots/your_material`) must have at least one valid item registered to it.
3.  **Matching Molten Fluid**: A fluid must exist with a tag or name that the integration mod recognizes as the "molten" version of that material (e.g., `productivemetalworks:molten_refined_obsidian`).

## Case Study: Refined Obsidian
In this modpack, Mekanism was removed, but Refined Obsidian was restored via KubeJS.
- **Items Registered**: `mekanism:ingot_refined_obsidian` was created and added to `#c:ingots/refined_obsidian`.
- **Fluid Exists**: Productive Metalworks already provides `productivemetalworks:molten_refined_obsidian`.
- **Material Exists**: Silent Gear has a built-in material for `refined_obsidian`.

**Result**: All 20+ Silent Gear part casting recipes appeared in JEI/REI automatically without any manual JSON configuration for the parts themselves.

## Best Practices
- **Prioritize Tags**: Always ensure your custom items are added to the correct `c:ingots/...` or `c:dusts/...` tags. The integration relies on these tags to "bridge" the fluid to the Silent Gear material.
- **Check JEI First**: Before spending time writing manual casting JSONs for Silent Gear parts, simply register the base ingot and its molten fluid. In most cases, the recipes will "self-assemble."

---
*Documented for future reference and AI synchronization.*
