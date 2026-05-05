
// Biofuel Unification
// The #c:biofuel fluid tag membership is declared via data:
//   kubejs/data/c/tags/fluid/biofuel.json
//
// This script uses ServerEvents.tags (the correct phase for tag resolution)
// to log the resolved members of #c:biofuel for debugging purposes.
// Recipe input patching via Ingredient.of().getFluids() does NOT work in
// ServerEvents.recipes because fluid tags are not yet resolved at that phase.

ServerEvents.tags('fluid', event => {
    // Add oritech:still_biofuel and createaddition:bioethanol to #c:biofuel
    // This is the programmatic equivalent of the data JSON tag file.
    // Both approaches are valid; the JSON file takes effect first.
    event.add('c:biofuel', 'oritech:still_biofuel')
    event.add('c:biofuel', 'createaddition:bioethanol')

    console.log('[Biofuel Patch] Registered oritech:still_biofuel and createaddition:bioethanol into #c:biofuel')
})
