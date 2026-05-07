

ServerEvents.recipes(event => {
  // Rebalance of 'machine addon extender'
  event.shaped(
    Item.of('oritech:machine_core_3', 1),
    [
      'AAA',
      'ABA',
      'AAA'
    ],
    {
      A: 'oritech:carbon_fibre_strands',
      B: 'oritech:fluxite_block'
    }
  )
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

  const extraOreProcessing = [
    { raw: 'tfmg:raw_lithium', output: 'tfmg:crushed_raw_lithium' },
    { raw: 'tfmg:raw_lead', output: 'create:crushed_raw_lead' },
    { raw: 'railcraft:silver_raw', output: 'create:crushed_raw_silver' },
    { raw: 'xycraft_world:raw_aluminum', output: 'create:crushed_raw_aluminum' }
  ]

  extraOreProcessing.forEach(ore => {
    // Pulverizer
    event.recipes.oritech.pulverizer()
      .itemInputs(ore.raw)
      .itemOutputs(`2x ${ore.output}`)
      .time(100)
      .id(`kubejs:pulverizer/${ore.raw.replace(':', '_')}`)

    // Grinder
    event.recipes.oritech.grinder()
      .itemInputs(ore.raw)
      .itemOutputs(`3x ${ore.output}`)
      .time(40)
      .id(`kubejs:grinder/${ore.raw.replace(':', '_')}`)
  })

  // Cheaty alloys
})


