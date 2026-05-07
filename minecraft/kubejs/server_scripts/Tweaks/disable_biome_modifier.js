ServerEvents.generateData('after_mods', event => {

    let ids = JsonIO.read("kubejs/server_scripts/Tweaks/disable_biome_modifier_ids.json").ids

    for (let id of ids) {
        event.json(id, {
            "type": "neoforge:none"
        })
    }
})
