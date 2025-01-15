// IIFE to wrap pokemonRepository
let pokemonRepository = (function () {

  // Defining pokemon Array from API
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // getAll function
  function getAll() {
    return pokemonList;
  }

  // add Function
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // Capitalize first letter of Pokemon names
  function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // addListItem Function
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    let button = document.createElement('button');
    button.innerText = capitalizeFirstLetter(pokemon.name);
    button.classList.add('pokemon-button', 'btn', 'btn-primary');
    button.addEventListener('click', () => showDetails(pokemon));

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  // showModal Function
  function showModal(title, text, img, abilitiesText) {
    let modalTitle = document.querySelector('#pokemonModalLabel');
    modalTitle.innerText = capitalizeFirstLetter(title);

    let modalImage = document.querySelector('#pokemonImage');
    modalImage.setAttribute('src', img);

    let modalHeight = document.querySelector('#pokemonHeight');
    modalHeight.innerText = text;

    let modalAbilities = document.querySelector('#pokemonAbilities');
    modalAbilities.innerText = abilitiesText;

    $('#pokemonModal').modal('show');
  }

  // showDetails Function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(
        pokemon.name,
        'Height: ' + pokemon.height,
        pokemon.imageUrl,
        'Abilities: ' + pokemon.abilities
      );
    });
  }

  // loadList Function
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((e) => console.error('Error loading list:', e))
      .finally(() => hideLoadingMessage());
  }

  // loadDetails Function
  function loadDetails(item) {
    showLoadingMessage();
    return fetch(item.detailsUrl)
      .then((response) => response.json())
      .then((details) => {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.abilities = details.abilities
        .map((abilityInfo) => abilityInfo.ability.name)
        .join(', ');
      })
      .catch((e) => console.error('Error loading details for:', item.name, e))
      .finally(() => hideLoadingMessage());
  }

  // showLoadingMessage Function
  function showLoadingMessage() {
    let loadingMessage = document.createElement('p');
    loadingMessage.innerText = 'Loading...';
    loadingMessage.classList.add('loading-message');
    document.body.appendChild(loadingMessage);
  }

  // hideLoadingMessage Function
  function hideLoadingMessage() {
    let loadingMessage = document.querySelector('.loading-message');
    if (loadingMessage) {
      document.body.removeChild(loadingMessage);
    }
  }

  // Return values
  return {
    getAll,
    add,
    addListItem,
    loadList,
    loadDetails,
  };
})();

// Load Pokémon and render list
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});

// Search Functionality
let searchInput = document.querySelector('.form-control[placeholder="Enter a Pokemon..."]');

searchInput.addEventListener('input', () => {
  let query = searchInput.value.toLowerCase();
  let allPokemon = pokemonRepository.getAll();

  // Filter Pokémon based on search query
  let filteredPokemon = allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query)
  );

  // Clear the current Pokémon list
  let pokemonListElement = document.querySelector('.list-group');
  pokemonListElement.innerHTML = '';

  // Add the filtered Pokémon back to the list
  filteredPokemon.forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });

  // Check for exact match and show modal if found
  let exactMatch = allPokemon.find(
    (pokemon) => pokemon.name.toLowerCase() === query
  );
  if (exactMatch) {
    pokemonRepository.showDetails(exactMatch);
  }
});