ServerEvents.tags('item', event => {
    // Populate c:tools tag to prevent recipe parsing errors for recipes that expect it to not be empty
    event.add('c:tools', ['#minecraft:pickaxes', '#minecraft:axes', '#minecraft:shovels', '#minecraft:swords', '#minecraft:hoes']);
});
