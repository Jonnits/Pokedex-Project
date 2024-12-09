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

// Function to add a list item for a single Pokemon
function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');

// Create a button for the Pokemon
let button = document.createElement('button');
button.innerText = pokemon.name;
button.classList.add('pokemon-button');

 // Append the span and button to the list item
 listItem.appendChild(button);

 // Append the list item to the unordered list
 pokemonListElement.appendChild(listItem);
}

    // forEach function iterating over each item in pokemonList array
    function displayAll() {
        pokemonList.forEach(function (pokemon) {
            addListItem(pokemon);
        });
}

// Return public methods
return { getAll, add, displayAll, findByName };
})();

// Command to display Pokemon
document.addEventListener('DOMContentLoaded', function () {
pokemonRepository.displayAll();
});