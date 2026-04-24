
ServerEvents.recipes(allthemods => {
    // Remove broken recipes from Create Things and Misc
    allthemods.remove({ id: 'create_things_and_misc:schematic_chair' })
    allthemods.remove({ id: 'create_things_and_misc:copper_scaffolding_craft' })

    // Remove broken recipes from Exposure Expanded
    const exposureBroken = [
        'exposure_expanded:instant_hires_black_and_white_slide',
        'exposure_expanded:instant_gameboy_slide',
        'exposure_expanded:instant_nes_slide',
        'exposure_expanded:instant_c64_slide',
        'exposure_expanded:instant_cga_slide',
        'exposure_expanded:instant_hires_color_slide'
    ]
    exposureBroken.forEach(id => allthemods.remove({ id: id }))

    // Remove recipes broken by missing AppFlux
    allthemods.remove({ id: 'allthemods:xycraft/extractor/flux_dust_bedrock' })
    allthemods.remove({ id: 'allthemods:xycraft/extractor/flux_dust' })

    // Remove KubeJS generated recipes that are broken (Integrated Dynamics, EnderIO, Actually Additions)
    // These usually have missing items like ae2:certus_quartz_dust
    allthemods.remove({ id: 'integrateddynamics:kjs/auyfvzieqej47d7zhj5tumyd2' })
    allthemods.remove({ id: 'integrateddynamics:kjs/7dmyq49bh8bv55lmrpjb0yzm' })
    allthemods.remove({ id: 'enderio:kjs/4loq85ylg3sm69hye7abxk7q0' })
    allthemods.remove({ id: 'actuallyadditions:kjs/222et4enola6281pym4gztc9a' })
})
