/*
*/

let stews = [
    "biomeswevegone:white_puffball_stew",
    "rootsclassic:rooty_stew",
    "undergarden:bloody_stew",
    "undergarden:inky_stew",
    "undergarden:indigo_stew",
    "undergarden:veiled_stew"
]

ItemEvents.modification(event => {
    stews.forEach(stew => {
        event.modify(stew, item => {
            item.maxStackSize = 16
        })
    })
})

