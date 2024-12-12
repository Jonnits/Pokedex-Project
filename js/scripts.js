let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function getAll() {
      return pokemonList;
    }
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function findByName(name) {
      return pokemonList.filter(pokemon => pokemon.name === name);
    }
  
    function showDetails(pokemon) {
      console.log(pokemon);
    }
  
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
  
    function loadList() {
      return fetch(apiUrl)
        .then(response => response.json())
        .then(json => json.results.forEach(item => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        }))
        .catch(e => console.error(e));
    }
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
        .then(response => response.json())
        .then(details => {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        })
        .catch(e => console.error(e));
    }
  
    return {
      getAll,
      add,
      showDetails,
      addListItem,
      loadList,
      loadDetails
    };
  })();
  
  pokemonRepository.loadList().then(() => pokemonRepository.getAll().forEach(pokemon => pokemonRepository.addListItem(pokemon)));