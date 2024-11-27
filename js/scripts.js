// pokemonList array to display pokemon objects

let pokemonList = [
    {name: 'Bulbasaur',
        height: 2.04,
        types: ['grass', 'poison'],
        weaknesses: ['fire', 'ice', 'flying', 'psychic'],
        category: 'Seed',
        abilities: 'Overgrow'
    },
    {name: 'Ivysaur',
        height: 3.03,
        types: ['grass', 'poison'],
        weaknesses: ['fire', 'ice', 'flying', 'psychic'],
        category: 'Seed',
        abilities: 'Overgrow'
    },
    {name: 'Venusaur',
        height: 6.07,
        types: ['grass', 'poison'],
        weaknesses: ['fire', 'ice', 'flying', 'psychic'],
        category: 'Seed',
        abilities: 'Overgrow'
    },
    {name: 'Charmander',
        height: 2.00,
        types: ['fire'],
        weaknesses: ['water', 'ground', 'rock'],
        category: 'Lizard',
        abilities: 'Blaze'
    },
    {name: 'Charmeleon',
        height: 3.07,
        types: ['fire'],
        weaknesses: ['water', 'ground', 'rock'],
        category: 'Flame',
        abilities: 'Blaze'
    },
    {name: 'Charizard',
        height: 5.07,
        types: ['fire', 'flying'],
        weaknesses: ['water', 'electric', 'rock'],
        category: 'Flame',
        abilities: 'Blaze'
    },
    {name: 'Squirtle',
        height: 1.08,
        types: ['water'],
        weaknesses: ['grass', 'electric'],
        category: 'Tiny Turtle',
        abilities: 'Torrent'
    },
    {name: 'Wartortle',
        height: 3.03,
        types: ['water'],
        weaknesses: ['grass', 'electric'],
        category: 'Turtle',
        abilities: 'Torrent'
    },
    {name: 'Blastoise',
        height: 5.03,
        types: ['water'],
        weaknesses: ['grass', 'electric'],
        category: 'Shellfish',
        abilities: 'Torrent'
    }
];

// for loop iterating over each item in pokemonList
for (let i = 0; i < pokemonList.length; i++) {

    // Writing Pokemon name and height to document output
    let output = '<span class="jaro">' + pokemonList[i].name + " (height: " + pokemonList[i].height + ")</span>";

    // Conditional to check if Pokemon is over 5'
    if (pokemonList[i].height > 5) {
        output += "<span class='special-text'> - Wow, that's big!</span>";
    }

    // Write the output to the document
    output += '<br>';
    document.write(output);
}