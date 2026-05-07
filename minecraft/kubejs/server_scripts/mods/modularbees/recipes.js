

ServerEvents.recipes(event => {

  event.recipes.modularbees.overclocker_electrode('modularbees:electrode_gold', 1.8);
  event.recipes.modularbees.overclocker_electrode('modularbees:electrode_netherite', 2.25);

  event.shaped(
    Item.of('modularbees:electrode_copper'),
    [
      ' NG',
      ' BN',
      'I  '
    ], {
    N: '#c:ingots/netherite',
    G: '#c:storage_blocks/gold',
    B: "#c:storage_blocks/copper",
    I: '#c:ingots/copper'
  }).id('kubejs:modularbees/electrode_copper')

  event.shaped(
    Item.of('modularbees:electrode_iron'),
    [
      ' NG',
      ' BN',
      'I  '
    ], {
    N: 'modularbees:electrode_copper',
    G: '#c:storage_blocks/gold',
    B: "#c:storage_blocks/iron",
    I: '#c:ingots/iron'
  }).id('kubejs:modularbees/electrode_iron')

  event.shaped(
    Item.of('modularbees:electrode_gold'),
    [
      ' NG',
      ' BN',
      'I  '
    ], {
    N: 'modularbees:electrode_iron',
    G: '#c:storage_blocks/gold',
    B: "#c:storage_blocks/gold",
    I: '#c:ingots/gold'
  }).id('kubejs:modularbees/electrode_gold')
  /*

  event.shaped(
    Item.of('modularbees:scented_plank', 4),
    [
      'NHN',
      'PPP',
      'NHN'
    ], {
    H: 'minecraft:honey_block',
    P: '#minecraft:planks'
  }).id('kubejs:modularbees/scented_plank')
    event.shaped(
      Item.of('modularbees:modular_beehive_core'),
      [
        'POP',
        'UBU',
        'PAP'
      ], {
      P: 'modularbees:scented_plank',
      O: 'productivelib:upgrade_productivity_4',
      B: 'minecraft:iron_bars',
      A: 'productivelib:upgrade_adult',
    }).id('kubejs:modularbees/modular_beehive_core')
  event.shaped(
    Item.of('modularbees:modular_beehive_part'),
    [
      'PPP',
      'PVP',
      'PPP'
    ], {
    P: 'modularbees:scented_plank',
  }).id('kubejs:modularbees/modular_beehive_part')
  */

  event.shaped(
    Item.of('modularbees:modular_beehive_feeder'),
    [
      ' P ',
      'PFP',
      ' P '
    ], {
    P: 'modularbees:modular_beehive_part',
    F: 'productivebees:feeder'
  }).id('kubejs:modularbees/modular_beehive_feeder')
  /*
    event.shaped(
      Item.of('modularbees:modular_beehive_alveary'),
      [
        'EPE',
        'PNP',
        'EPE'
      ], {
      E: '#productivebees:expansion_boxes',
      P: 'modularbees:modular_beehive_part',
    }).id('kubejs:modularbees/modular_beehive_alveary')
  */
  event.shaped(
    Item.of('modularbees:modular_beehive_overclocker'),
    [
      'PBP',
      'BOB',
      'PBP'
    ], {
    P: 'modularbees:modular_beehive_part',
    B: 'minecraft:iron_bars',
    O: 'productivelib:upgrade_productivity_4'
  }).id('kubejs:modularbees/modular_beehive_overclocker')
})

