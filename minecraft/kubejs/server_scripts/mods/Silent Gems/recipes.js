ServerEvents.recipes(event => {
    event.remove({ id: /silentgems:.*teleporter/ })
    event.remove({ id: "silentgems:teleporter_linker" })
})