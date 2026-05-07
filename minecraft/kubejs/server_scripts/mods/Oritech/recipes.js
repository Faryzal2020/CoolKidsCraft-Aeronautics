

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

  // Cheaty alloys
})


