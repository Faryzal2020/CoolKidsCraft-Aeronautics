

ServerEvents.recipes(event => {
  event.remove({ id: 'oritech:crafting/core1' })
  event.remove({ id: 'oritech:crafting/core2' })
  event.remove({ id: 'oritech:crafting/core2alt' })
  event.remove({ id: 'oritech:crafting/core3' })
  event.remove({ id: 'oritech:crafting/core3alt' })
  event.remove({ id: 'oritech:crafting/core4' })
  event.remove({ id: 'oritech:crafting/core5' })
  event.remove({ id: 'oritech:crafting/core6' })
  event.remove({ id: 'oritech:crafting/core7' })

  event.shaped(
    Item.of('oritech:machine_core_1', 1),
    [
      'AAA',
      'ABA',
      'AAA'
    ],
    {
      A: 'create:andesite_casing',
      B: 'railcraft:powered_rolling_machine'
    }
  )

  event.shaped(
    Item.of('oritech:machine_core_2', 1),
    [
      'AAA',
      'ABA',
      'AAA'
    ],
    {
      A: 'xycraft_machines:machine_base',
      B: 'oritech:machine_core_1'
    }
  )

  event.recipes.createMechanicalCrafting('oritech:machine_core_3', [
    'CCCCC',
    'CAAAC',
    'CABAC',
    'CAAAC',
    'CCCCC'
  ], {
    A: 'oritech:carbon_fibre_strands',
    B: 'oritech:machine_core_2',
    C: 'oritech:nickel_plating_block'
  })
  event.shaped(
    Item.of('oritech:machine_extender', 1),
    [
      'AAA',
      'ABA',
      'AAA'
    ],
    {
      A: 'oritech:carbon_plating_block',
      B: 'oritech:machine_core_3'
    }
  )
  // Oil compatibility

  event.custom({
    "type": "oritech:refinery",
    "fluidInput": {
      "fluid": "#c:crude_oil",
      "amount": 1000
    },
    "fluidOutputs": [
      {
        "amount": 500,
        "fluid": "oritech:still_heavy_oil"
      },
      {
        "amount": 250,
        "fluid": "oritech:still_naphtha"
      },
      {
        "amount": 250,
        "fluid": "oritech:still_sulfuric_acid"
      }
    ],
    "ingredients": [],
    "results": [],
    "time": 120
  })
  event.custom({
    "type": "oritech:refinery",
    "fluidInput": {
      "fluid": "#c:crude_oil",
      "amount": 1000
    },
    "fluidOutputs": [
      {
        "amount": 500,
        "fluid": "oritech:still_diesel"
      },
      {
        "amount": 500,
        "fluid": "oritech:still_naphtha"
      },
      {
        "amount": 500,
        "fluid": "oritech:still_sulfuric_acid"
      }
    ],
    "ingredients": [
      {
        "item": "oritech:clay_catalyst_beads"
      }
    ],
    "results": [],
    "time": 120
  })
  // Remove enchanting stuff

  // Extra Ore Processing
  // Pulverizer: 1 Raw -> 2x Output
  // Grinder (Fragment Forge): 1 Raw -> 3x Output

  const pulverizer = [
    { raw: 'tfmg:raw_lithium', output: 'tfmg:crushed_raw_lithium' },
    { raw: 'tfmg:raw_lead', output: 'create:crushed_raw_lead' },
    { raw: 'railcraft:silver_raw', output: 'create:crushed_raw_silver' },
    { raw: 'xycraft_world:raw_aluminum', output: 'create:crushed_raw_aluminum' },
    { raw: 'create:raw_zinc', output: 'create:crushed_raw_zinc' }
  ]
  const grinder = [
    { raw: 'tfmg:raw_lithium', output: 'tfmg:crushed_raw_lithium' },
    { raw: 'tfmg:raw_lead', output: 'create:crushed_raw_lead' },
    { raw: 'railcraft:silver_raw', output: 'create:crushed_raw_silver' },
    { raw: 'xycraft_world:raw_aluminum', output: 'create:crushed_raw_aluminum' }
  ]

  pulverizer.forEach(ore => {
    // Pulverizer
    event.recipes.oritech.pulverizer()
      .itemInputs(ore.raw)
      .itemOutputs(`2x ${ore.output}`)
      .time(100)
      .id(`kubejs:pulverizer/${ore.raw.replace(':', '_')}`)
  })

  grinder.forEach(ore => {
    // Grinder
    event.recipes.oritech.grinder()
      .itemInputs(ore.raw)
      .itemOutputs(`3x ${ore.output}`)
      .time(40)
      .id(`kubejs:grinder/${ore.raw.replace(':', '_')}`)
  })

  // Centrifuge and Fluid Separation
  const centrifuge_processing = [
    { input: 'tfmg:crushed_raw_lithium', output: 'tfmg:lithium_nugget' },
    { input: 'create:crushed_raw_lead', output: 'tfmg:lead_nugget' },
    { input: 'create:crushed_raw_silver', output: 'railcraft:silver_nugget' },
    { input: 'create:crushed_raw_aluminum', output: 'tfmg:aluminum_nugget' }
  ]

  centrifuge_processing.forEach(ore => {
    let id_base = ore.input.replace(':', '_')

    // Centrifuge
    event.recipes.oritech.centrifuge()
      .itemInputs(ore.input)
      .itemOutputs(`9x ${ore.output}`)
      .time(100)
      .id(`kubejs:centrifuge/${id_base}`)

    // Fluid Separation (Sulfuric Acid)
    event.recipes.oritech.centrifuge_fluid()
      .itemInputs(ore.input)
      .fluidInput('1000x oritech:still_sulfuric_acid')
      .itemOutputs(`27x ${ore.output}`)
      .fluidOutputs('250x oritech:still_mineral_slurry')
      .time(100)
      .id(`kubejs:centrifuge_fluid/sulfuric_acid/${id_base}`)

    // Fluid Separation (Water)
    event.recipes.oritech.centrifuge_fluid()
      .itemInputs(ore.input)
      .fluidInput('1000x minecraft:water')
      .itemOutputs(`9x ${ore.output}`)
      .time(100)
      .id(`kubejs:centrifuge_fluid/water/${id_base}`)
  })

  // Cheaty alloys
})
