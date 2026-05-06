ServerEvents.loaded(event => {
    // Access the internal Minecraft Loot Data
    const $LootDataType = Java.loadClass('net.minecraft.world.level.storage.loot.LootDataType')
    const $LootTable = Java.loadClass('net.minecraft.world.level.storage.loot.LootTable')
    const $LootContextParamSets = Java.loadClass('net.minecraft.world.level.storage.loot.parameters.LootContextParamSets')
    const $JsonOps = Java.loadClass('com.mojang.serialization.JsonOps')

    //previous mistakes:
    //let lootData = event.server.lootData <- cannot call method 'getKeys' of undefined
    //let lootData = event.server.reloadableRegistries().getLootData() <- no getLootData function in ReloadableServerRegistries

    const $Registries = Java.loadClass('net.minecraft.core.registries.Registries')

    //these doesn't work because loot tables are not part of registryAccess, these were written by gemini 3 flash saying that it is the correct 1.21.1 method.
    //let lootRegistry = event.server.registryAccess().registryOrThrow($Registries.LOOT_TABLE)
    //let allTables = lootRegistry.keySet()

    console.log("[Loot Debug] Starting loot export...")

    // 1.21.1 Fix: Loot tables are now in reloadableRegistries().get().lookup()
    let registries = event.server.reloadableRegistries().get()
    let lootLookup = registries.lookup($Registries.LOOT_TABLE).get()
    let allTableKeys = lootLookup.listElementIds().toList()

    let tableMap = {}
    let tableList = []

    console.log("[Loot Debug] Found " + allTableKeys.size() + " total loot tables. Filtering for 'minecraft:chest' type...")
    let enabled = false
    if (enabled) {
        allTableKeys.forEach(key => {
            let id = key.location()
            let idStr = id.toString()

            let tableWrapper = lootLookup.get(key)
            if (tableWrapper.isPresent()) {
                let table = tableWrapper.get().value()

                // Only process if it's a chest loot table (equivalent to LootJS LootType.CHEST)
                if (table.getParamSet() !== $LootContextParamSets.CHEST) return;

                tableList.push(idStr)
                try {
                    // Use Minecraft's own Codec to convert the LootTable object back to JSON
                    let jsonElement = $LootTable.DIRECT_CODEC.encodeStart($JsonOps.INSTANCE, table).getOrThrow()
                    tableMap[idStr] = JSON.parse(jsonElement.toString())
                } catch (e) {
                    tableMap[idStr] = { error: "Failed to serialize: " + e }
                }
            }
        })
    }

    // Write the detailed data to a new file
    JsonIO.write('kubejs/exported/loot_table_details.json', tableMap)

    // Also update the simple list for convenience
    JsonIO.write('kubejs/exported/loot_tables.json', {
        count: tableList.length,
        all_loot_tables: tableList
    })

    console.log("[Loot Debug] Exported " + tableList.length + " chest loot tables with full details to kubejs/exported/loot_table_details.json")
})