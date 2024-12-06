// IIFE to wrap around pokemonList array
(function () {
    // pokemonList array to display pokemon objects

    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 2.04,
            types: ['grass', 'poison'],
            weaknesses: ['fire', 'ice', 'flying', 'psychic'],
            category: 'Seed',
            abilities: 'Overgrow'
        },
        {
            name: 'Ivysaur',
            height: 3.03,
            types: ['grass', 'poison'],
            weaknesses: ['fire', 'ice', 'flying', 'psychic'],
            category: 'Seed',
            abilities: 'Overgrow'
        },
        {
            name: 'Venusaur',
            height: 6.07,
            types: ['grass', 'poison'],
            weaknesses: ['fire', 'ice', 'flying', 'psychic'],
            category: 'Seed',
            abilities: 'Overgrow'
        },
        {
            name: 'Charmander',
            height: 2.00,
            types: ['fire'],
            weaknesses: ['water', 'ground', 'rock'],
            category: 'Lizard',
            abilities: 'Blaze'
        },
        {
            name: 'Charmeleon',
            height: 3.07,
            types: ['fire'],
            weaknesses: ['water', 'ground', 'rock'],
            category: 'Flame',
            abilities: 'Blaze'
        },
        {
            name: 'Charizard',
            height: 5.07,
            types: ['fire', 'flying'],
            weaknesses: ['water', 'electric', 'rock'],
            category: 'Flame',
            abilities: 'Blaze'
        },
        {
            name: 'Squirtle',
            height: 1.08,
            types: ['water'],
            weaknesses: ['grass', 'electric'],
            category: 'Tiny Turtle',
            abilities: 'Torrent'
        },
        {
            name: 'Wartortle',
            height: 3.03,
            types: ['water'],
            weaknesses: ['grass', 'electric'],
            category: 'Turtle',
            abilities: 'Torrent'
        },
        {
            name: 'Blastoise',
            height: 5.03,
            types: ['water'],
            weaknesses: ['grass', 'electric'],
            category: 'Shellfish',
            abilities: 'Torrent'
        }
    ];

    // forEach function iterating over each item in pokemonList array
    pokemonList.forEach(function(pokemon) {
        let span = document.createElement('span');
        span.className = 'jaro';
        span.innerHTML = `${pokemon.name} (height: ${pokemon.height})`;
        // Conditional to check if Pokemon is over 5' and add specialText if so
        if (pokemon.height > 5) {
            let specialText = document.createElement('span');
            specialText.className = 'special-text';
            specialText.innerHTML = " - Wow, that's big!"
            span.appendChild(specialText);
    }
    // Write output to the document with line break between each item
    let br = document.createElement('br');
    document.body.appendChild(span);
    document.body.appendChild(br);
    });
})();