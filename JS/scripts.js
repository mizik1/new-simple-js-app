// Pokemon data is private in this method by wrapping in IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/";

  // Adds function adds item to pokemonList
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  // Returns pokemonList
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list"); // uses "pokemon-list" class defined in index file
    let listItem = document.createElement("li"); // created "li" element
    let button = document.createElement("button"); // created "button" tag
    button.innerText = pokemon.name; // linked text from pokemonRepository
    button.classList.add("button-class"); // added styles defined in CSS "button-class"
    listItem.appendChild(button); // appended button into "li"
    pokemonList.appendChild(listItem); // appended 'li' into parent element
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  // add function loadlist below - promise function
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // loadDetails function gets details after clicking on box
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // now add details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  // "return" exposes private data in getAll, add and showDetails functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// Filters pokemons by height.
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
