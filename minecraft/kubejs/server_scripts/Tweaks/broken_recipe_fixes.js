
ServerEvents.recipes(event => {
    // Remove broken recipes from Create Things and Misc
    // These are removed because they contain 'deleted_mod_element' and cause errors during recipe scans.

    /* commented out because these does not solve the problem from the source and cause more problems
    */

    // Remove broken recipes from Exposure Expanded
    // These are removed because they reference missing registry items.

    /* commented out because these does not solve the problem from the source and cause more problems
    const exposureBroken = [
        'exposure_expanded:instant_hires_black_and_white_slide',
        'exposure_expanded:instant_gameboy_slide',
        'exposure_expanded:instant_nes_slide',
        'exposure_expanded:instant_c64_slide',
        'exposure_expanded:instant_cga_slide',
        'exposure_expanded:instant_hires_color_slide'
    ]
    */

    // Remove recipes broken by missing AppFlux

    // Remove KubeJS generated recipes that are broken (Integrated Dynamics, EnderIO, Actually Additions)
    // These usually have missing items like ae2:certus_quartz_dust
})

