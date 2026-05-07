

ServerEvents.recipes(event => {
    event.custom(
        {
            catalyst: 'actuallyadditions:crystallized_canola_seed',
            input: {
                Name: "actuallyadditions:refined_canola_oil",
                Properties: {
                    level: "0"
                }
            },
            output: {
                Name: "actuallyadditions:crystallized_oil",
                Properties: {
                    level: "0"
                }
            }
        }
    )

    event.custom(
        {
            catalyst: 'actuallyadditions:empowered_canola_seed',
            input: {
                Name: "actuallyadditions:crystallized_oil",
                Properties: {
                    level: "0"
                }
            },
            output: {
                Name: "actuallyadditions:empowered_oil",
                Properties: {
                    level: "0"
                }
            }
        }
    )
})

