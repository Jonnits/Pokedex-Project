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

  // addListItem Function
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('list-group-item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button', 'btn', 'btn-primary');
    button.addEventListener('click', () => showDetails(pokemon));
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }

  // showModal Function
  function showModal(title, text, img) {
    let modalTitle = document.querySelector('#pokemonModalLabel');
    modalTitle.innerText = title;

    let modalImage = document.querySelector('#pokemonImage');
    modalImage.setAttribute('src', img);

    let modalHeight = document.querySelector('#pokemonHeight');
    modalHeight.innerText = text;

    $('#pokemonModal').modal('show');
    }

  // showDetails Function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(
        pokemon.name,
        'Height: ' + pokemon.height,
        pokemon.imageUrl
      );
    });
  }

  // loadList Function
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl) // Fixed apiUrl typo
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
    let url = item.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types
          .map((typeInfo) => typeInfo.type.name)
          .join(', ');
      })
      .catch((e) =>
        console.error('Error loading details for:', item.name, e)
      )
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
    showDetails,
    addListItem,
    loadList,
    loadDetails,
  };
})();

// forEach method to display details of each Pokemon
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});

// Search Functionality
let searchForm = document.querySelector('.form-inline');
let searchInput = document.querySelector('.form-control[placeholder="Search"]');

searchInput.addEventListener('input', () => {
  let query = searchInput.value.toLowerCase();
  let allPokemon = pokemonRepository.getAll();

  // Filter Pokémon based on search query
  let filteredPokemon = allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query)
  );

  // Clear the current Pokémon list
  let pokemonList = document.querySelector('.list-group');
  pokemonList.innerHTML = '';

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