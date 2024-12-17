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
  // findByName Function
    function findByName(name) {
      return pokemonList.filter(pokemon => pokemon.name === name);
    }
  // showDetails Function
    function showDetails(pokemon) {
        loadDetails(pokemon);
        console.log(pokemon);
    }
  // addListItem Function
    function addListItem(pokemon) {
      let pokemonListElement = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      button.addEventListener('click', () => showDetails(pokemon));
      listItem.appendChild(button);
      pokemonListElement.appendChild(listItem);
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
// loadList Function
    function loadList() {
        console.log('loadList started');
        showLoadingMessage();
      return fetch(apiUrl)
        .then(response => response.json())
        .then(json => { 
            json.results.forEach(item => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
    })
        .catch(e => console.error('Error loading list:', e))
        .finally(() => {
            hideLoadingMessage();
        console.log('Loading message hidden');
    });
}
  // loadDetails Function
    function loadDetails(item) {
      let url = item.detailsUrl;
      console.log('loadDetails started for:', item.name);
      showLoadingMessage();
      return fetch(url)
        .then(response => response.json())
        .then(details => {
          console.log('Details for:', item.name, details);
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        })
        .catch(e => console.error('Error loading details for:', item.name, e))
        .finally(() => {
            hideLoadingMessage();
            console.log('Loading message hidden');
        });
    }
  // Return values
    return {
      getAll,
      add,
      showDetails,
      addListItem,
      loadList,
      loadDetails
    };
  })();
  
  pokemonRepository.loadList().then(() => { 
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    });
});