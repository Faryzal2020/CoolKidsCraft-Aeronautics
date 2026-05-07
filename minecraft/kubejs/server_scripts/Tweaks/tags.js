
ServerEvents.tags('item', event => {
  // Waystones
  event.add('ftbchunks:interact_whitelist', ['@waystones'])

  // Essence Blocks
  event.add('c:storage_blocks/air_essence', 'kubejs:air_essence_block')
  event.add('c:storage_blocks/earth_essence', 'kubejs:earth_essence_block')
  event.add('c:storage_blocks/fire_essence', 'kubejs:fire_essence_block')
  event.add('c:storage_blocks/water_essence', 'kubejs:water_essence_block')
  event.add('c:storage_blocks', [
    '#c:storage_blocks/air_essence',
    '#c:storage_blocks/earth_essence',
    '#c:storage_blocks/fire_essence',
    '#c:storage_blocks/water_essence'
  ])

  // Entangled
  if (Platform.isLoaded('entangled')) {
    event.add('entangled:invalid_targets',
      ['@ae2', '@advancedae', '@extendedae', '@megacells', '@appflux', '@appmek']
    )
  }

  // Saltpeter Block
  event.add('c:storage_blocks/niter', 'kubejs:saltpeter_block')
  event.add('c:storage_blocks/saltpeter', 'kubejs:saltpeter_block')
  event.add('c:storage_blocks', '#c:storage_blocks/niter')

  // Extreme Reactors
  event.add('c:storage_blocks/raw_yellorium', 'bigreactors:raw_yellorium_block')

  // Tiny Coal
  event.add('c:tiny_coal', [
    'utilitarian:tiny_coal',
    'actuallyadditions:tiny_coal'
  ])
  event.add('c:tiny_charcoal', [
    'utilitarian:tiny_charcoal',
    'actuallyadditions:tiny_charcoal'
  ])

  // Silent Gear
  event.add('c:storage_blocks', '#c:storage_blocks/raw_crimson_iron')
  event.add('c:storage_blocks', '#c:storage_blocks/raw_azure_silver')

  // Books
  event.add('minecraft:bookshelf_books', [
    'patchouli:guide_book',
    'powah:book',
    'actuallyadditions:booklet'
  ])

  // Bosses
  event.add('c:bosses', [
    "cataclysm:amethyst_crab",
    "cataclysm:ancient_remnant",
    "cataclysm:coralssus",
    "cataclysm:ender_golem",
    "cataclysm:ender_guardian",
    "cataclysm:ignis",
    "cataclysm:ignited_revenant",
    "cataclysm:kobolediator",
    "cataclysm:maledictus",
    "cataclysm:modern_remnant",
    "cataclysm:netherite_monstrosity",
    "cataclysm:the_baby_leviathan",
    "cataclysm:the_harbinger",
    "cataclysm:the_leviathan",
    "cataclysm:the_prowler",
    "cataclysm:wadjet",
    "#neoforge:bosses"
  ])

  if (Platform.isLoaded("eternal_starlight")) {
    event.add('c:bosses', [
      "eternal_starlight:starlight_golem",
      "eternal_starlight:the_gatekeeper"
    ])
  }

  // Jank Blacklist
  event.add('kubejs:jank_blacklist', [
    "@iceandfire",
    'artifacts:mimic',
    'create:package',
    'mekanism:robit',
    'twilightforest:hedge_spider',
    'twilightforest:swarm_spider',
    '#c:bosses',
    "@occultism",
    "@productivebees",
    "the_bumblezone:bee_queen"
  ].filter(i => i != null))

  // System Blacklists
  event.add('apothic_spawners:blacklisted_from_spawners', '#kubejs:jank_blacklist')
  event.add('enderio:soul_vial_blacklist', '#kubejs:jank_blacklist')
  event.add('industrialforegoing:mob_duplicator_blacklist', '#kubejs:jank_blacklist')
  event.add('industrialforegoing:mob_crusher_blacklist', '#kubejs:jank_blacklist')
  event.add('tombstone:unhandled_tamable', '#kubejs:jank_blacklist')
  event.add('mob_grinding_utils:no_swab', '#kubejs:jank_blacklist')
  event.add('mob_grinding_utils:no_spawn', '#kubejs:jank_blacklist')
  event.add('enderio:spawner_blacklist', '#kubejs:jank_blacklist')
  event.add('oritech:spawner_blacklist', '#kubejs:jank_blacklist')
})

ServerEvents.tags('fluid', event => {
  // Pneumaticcraft
  event.add('c:ethanol', 'pneumaticcraft:ethanol')
  event.add("c:experience", "create_enchantment_industry:experience")

  // TFMG & PneumaticCraft
  event.add('c:crude_oil', ['tfmg:crude_oil', 'pneumaticcraft:crude_oil', 'pneumaticcraft:oil', 'oritech:still_oil'])
  event.add('c:fuels/crude_oil', ['tfmg:crude_oil', 'pneumaticcraft:crude_oil', 'pneumaticcraft:oil', 'oritech:still_oil'])
  event.add('c:heavy_oil', ['tfmg:heavy_oil', 'oritech:still_heavy_oil'])
  event.add('c:fuels/heavy_oil', ['tfmg:heavy_oil', 'oritech:still_heavy_oil'])
})

ServerEvents.tags('entity_type', event => {
  // Cataclysm
  event.add('cataclysm:berserker_spawn', "betterfortresses:fortress")
})
