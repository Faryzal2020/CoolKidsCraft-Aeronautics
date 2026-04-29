ServerEvents.loaded(event => {
    // Access the internal Minecraft Loot Data
    const $LootDataType = Java.loadClass('net.minecraft.world.level.storage.loot.LootDataType')
    const $LootTable = Java.loadClass('net.minecraft.world.level.storage.loot.LootTable')
    const $JsonOps = Java.loadClass('com.mojang.serialization.JsonOps')

    //previous mistakes:
    //let lootData = event.server.lootData <- cannot call method 'getKeys' of undefined
    //let lootData = event.server.reloadableRegistries().getLootData() <- no getLootData function in ReloadableServerRegistries

    const $Registries = Java.loadClass('net.minecraft.core.registries.Registries')

    //these doesn't work because loot tables are not part of registryAccess, these were written by gemini 3 flash saying that it is the correct 1.21.1 method.
    //let lootRegistry = event.server.registryAccess().registryOrThrow($Registries.LOOT_TABLE)
    //let allTables = lootRegistry.keySet()

    // 1.21.1 Fix: Loot tables are now in reloadableRegistries().lookup()
    let lootLookup = event.server.reloadableRegistries().lookup($Registries.LOOT_TABLE).get()
    let allTableKeys = lootLookup.listElementIds().toList()

    let tableMap = {}

    console.log("[Loot Debug] Found " + allTableKeys.size() + " loot tables")
    allTableKeys.forEach(key => {
        let id = key.location()
        let table = lootLookup.get(key).get().value()

        if (table) {
            try {
                // Use Minecraft's own Codec to convert the LootTable object back to JSON
                // This captures everything: pools, entries, conditions, functions, etc.
                let jsonElement = $LootTable.DIRECT_CODEC.encodeStart($JsonOps.INSTANCE, table).getOrThrow()
                let jsonString = jsonElement.toString()
                tableMap[id.toString()] = JSON.parse(jsonString)
            } catch (e) {
                tableMap[id.toString()] = { error: "Failed to serialize: " + e }
            }
        }
    })

    // Write the detailed data to a new file
    JsonIO.write('kubejs/exported/loot_table_details.json', tableMap)

    // Also update the simple list for convenience
    let tableList = allTableKeys.stream().map(key => key.location().toString()).toList()
    JsonIO.write('kubejs/exported/loot_tables.json', {
        count: tableList.size(),
        all_loot_tables: tableList
    })

    console.log("[Loot Debug] Exported " + tableList.size() + " loot tables with full details to kubejs/exported/loot_table_details.json")
})