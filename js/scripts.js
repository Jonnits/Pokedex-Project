// IIFE to wrap around pokemonList array
let pokemonRepository = (function () {

    // pokemonList array to privately display Pokemon data
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

// Public funcrion to return all Pokemon in the list
function getAll() {
    return pokemonList;
}

// Public function to add a Pokemon to the list
function add(pokemon) {
    // Validation to ensure the input is a valid object
    const expectedKeys = ['name', 'height', 'types', 'weaknesses', 'category', 'abilities'];
    const actualKeys = Object.keys(pokemon);

    if (typeof pokemon === 'object' && expectedKeys.every(key => actualKeys.includes(key))) {
        pokemonList.push(pokemon);
    } else {
        console.error('Invalid Pokemon object. Must contain ALL required properties.');
    }
}

// Public function to find individual Pokemon by their name
function findByName(name) {
    return pokemonList.filter(pokemon => pokemon.name === name);
}

    // forEach function iterating over each item in pokemonList array
    function displayAll() {
        let pokemonListElement = document.querySelector('.pokemon-list');
    
    pokemonList.forEach(function(pokemon) {
        let listItem = document.createElement('li');
        let span = document.createElement('span');
        span.className = 'jaro';
        span.innerHTML = `${pokemon.name} (height: ${pokemon.height})`;
        // Create a button for the Pokemon
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        // Conditional to check if Pokemon is over 5' and add specialText if so
        if (pokemon.height > 5) {
            let specialText = document.createElement('span');
            specialText.className = 'special-text';
            specialText.innerHTML = " - Wow, that's big!"
            span.appendChild(specialText);
    }

    // Append the span and button to the list item
    listItem.appendChild(span);
    listItem.appendChild(button);

    // Append the list item to the unordered list
    pokemonListElement.appendChild(listItem);
    });
}

// Return public methods
return { getAll, add, displayAll, findByName };
})();

// Command to display Pokemon
document.addEventListener('DOMContentLoaded', function () {
pokemonRepository.displayAll();
});