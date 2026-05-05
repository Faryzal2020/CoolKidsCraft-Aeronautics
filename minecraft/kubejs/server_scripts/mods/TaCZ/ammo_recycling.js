// TaCZ Ammo Recycling Recipes
// Converts TaCZ ammo items into alltheores copper resources.
//
// WHY THIS IS A SCRIPT AND NOT JSON:
// tacz:ammo items use minecraft:custom_data to store the AmmoId.
// Without NBT matching, "item": "tacz:ammo" resolves to tacz:empty (the
// default/unloaded form) which has no AmmoId set. JSON recipe files cannot
// match items by data components. KubeJS scripts can via the components field.
// Each ammo type needs its own recipe entry because each has unique custom_data.
//
// NOTE: If the components matching approach also fails (oritech may not inspect
// components in its custom recipe parser), a fallback would be to use KubeJS
// item filters with .withNBT() via a crafting recipe or a mod that supports
// component-aware ingredient matching at the Java level.
//
// WHY ITEM.OF() WITH CUSTOM_DATA:
// tacz:ammo items store their caliber in the minecraft:custom_data component
// (AmmoId field). Without this, any recipe targeting "tacz:ammo" by ID alone
// matches tacz:empty (the base item with no AmmoId), not real ammo.
//
// WHY event.recipes.oritech.pulverizer() INSTEAD OF event.custom():
// The KubeJS-Oritech mod provides typed recipe builders that go through
// Oritech's own ingredient resolver, which properly handles ItemStack inputs
// (including component data). event.custom() bypasses this and passes raw JSON
// to Oritech's codec which does not inspect data components in ingredients.
//
// GRINDER = Fragment Forge (internally "oritech:grinder")
// Pulverizer is the early-game slow version; grinder is the upgraded faster one.

var TACZ_AMMO_TYPES = [
    { ammoId: "tacz:9mm", note: "glock_17, b93r, cz75, hk_mp5a5, uzi" },
    { ammoId: "tacz:45acp", note: "m1911, p320, ump45, vector45" },
    { ammoId: "tacz:57x28", note: "p90" },
    { ammoId: "tacz:12g", note: "aa12, db_long, db_short, m1014, m870, spas_12" },
    { ammoId: "tacz:556x45", note: "aug, g36k, hk416d, m16a1, m16a4, m249, m4a1, scar_l, spr15hb" },
    { ammoId: "tacz:762x39", note: "ak47, rpk, sks_tactical, type_81" },
    { ammoId: "tacz:308", note: "fn_evolys, fn_fal, hk_g3, minigun, mk14, scar_h" },
    { ammoId: "tacz:338", note: "ai_awp" },
    { ammoId: "tacz:50bmg", note: "m107, m95" },
    { ammoId: "tacz:50ae", note: "deagle, timeless50" },
    { ammoId: "tacz:357mag", note: "deagle_golden" },
    { ammoId: "tacz:40mm", note: "m320" },
    { ammoId: "tacz:30_06", note: "m700" },
    { ammoId: "tacz:45_70", note: "springfield1873" },
    { ammoId: "tacz:rpg_rocket", note: "rpg7" },
    { ammoId: "tacz:58x42", note: "qbz_191, qbz_95" },
];

ServerEvents.recipes(event => {
    TACZ_AMMO_TYPES.forEach(entry => {
        var ammoId = entry.ammoId;
        var safeId = ammoId.replace("tacz:", "").replace(":", "_");

        // ItemStack with the specific AmmoId component — this is what matches
        // real ammo in the player's inventory, not tacz:empty.
        var ammoItem = Item.of("tacz:ammo", { "minecraft:custom_data": { "AmmoId": ammoId } });

        // --- Oritech Pulverizer (early-game): ammo -> 1x copper_dust ---
        // Pulverizer: exactly 1 input, 1-2 outputs
        event.recipes.oritech
            .pulverizer()
            .itemInputs(ammoItem)
            .itemOutputs("alltheores:copper_dust")
            .time(100)
            .id("kubejs:tacz_ammo_pulverizer_" + safeId);

        // --- Oritech Fragment Forge / Grinder (upgraded): ammo -> 1x copper_dust ---
        // Grinder: exactly 1 input, 1-3 outputs, faster than pulverizer
        event.recipes.oritech
            .grinder()
            .itemInputs(ammoItem)
            .itemOutputs("alltheores:copper_dust")
            .time(40)
            .id("kubejs:tacz_ammo_grinder_" + safeId);

        // --- Create Crushing Wheels: ammo -> 3x copper_nugget + 25% bonus ---
        event.custom({
            "type": "create:crushing",
            "ingredients": [{ "item": "tacz:ammo", "components": { "minecraft:custom_data": { "AmmoId": ammoId } } }],
            "processing_time": 200,
            "results": [
                { "count": 3, "id": "alltheores:copper_nugget" },
                { "chance": 0.25, "id": "alltheores:copper_nugget" }
            ]
        }).id("kubejs:tacz_ammo_crushing_" + safeId);

        // --- Create Millstone: ammo -> 1x copper_nugget + 50% bonus ---
        event.custom({
            "type": "create:milling",
            "ingredients": [{ "item": "tacz:ammo", "components": { "minecraft:custom_data": { "AmmoId": ammoId } } }],
            "processing_time": 150,
            "results": [
                { "count": 1, "id": "alltheores:copper_nugget" },
                { "chance": 0.5, "id": "alltheores:copper_nugget" }
            ]
        }).id("kubejs:tacz_ammo_milling_" + safeId);
    });
});

// NOTES ON WHAT DID NOT WORK:
// - JSON recipe files: "item": "tacz:ammo" always resolves to tacz:empty.
// - JSON "tag": "tacz:ammo" item tag: same problem.
// - event.custom() with "components" in ingredients: Oritech's Java-side
//   recipe codec does not inspect data components — matched tacz:empty.
// - Create crushing/milling via event.custom() with "components": UNTESTED,
//   may also fail. If so, use KubeJS-Create typed builders when available.
