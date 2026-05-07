ServerEvents.recipes(event => {
    // Washing (Splashing)
    event.recipes.create.splashing('9x tfmg:lithium_nugget', 'tfmg:crushed_raw_lithium')
    event.recipes.create.splashing('9x tfmg:lead_nugget', 'create:crushed_raw_lead')
    event.recipes.create.splashing('9x tfmg:aluminum_nugget', 'create:crushed_raw_aluminum')

    // Crushing
    //event.recipes.createCrushing(['oritech:nickel_clump', Item.of('create:experience_nugget').withChance(0.25)], '#c:raw_materials/nickel').processingTime(250)
})
