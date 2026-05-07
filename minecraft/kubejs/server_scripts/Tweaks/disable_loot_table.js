ServerEvents.generateData('after_mods', event => {

    let ids = JsonIO.read("kubejs/server_scripts/Tweaks/disable_loot_table_ids.json").ids

    for (let id of ids) {
        event.json(id, {
            "neoforge:conditions": [
                {
                    "type": "neoforge:false"
                }
            ]
        })
    }
})
