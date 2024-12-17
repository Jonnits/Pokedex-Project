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
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    listPokemon.classList.add('list-group-item');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button', 'btn', 'btn-primary');
    button.addEventListener('click', () => showDetails(pokemon));
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }

  // showModal Function
  function showModal(title, text, img) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = ''; // Clear previous modal content

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', img);
    imageElement.classList.add('pokemon-image');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);

    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');

    // Close modal when clicking outside it
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        hideModal();
      }
    });
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

  // hideModal Function
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // Close modal with Escape key
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

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
