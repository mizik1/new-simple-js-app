// Pokemon data is private in this method by wrapping in IIFE
let pokemonRepository = (function () {
  // Pokemon data array
  let pokemonList = [
    { name: "Bulbasur", height: 2.04, types: ["grass", "poison"] },
    { name: "Charizard", height: 5.07, types: ["fire", "flying"] },
    { name: "Squirtle", height: 1.08, types: ["water"] },
  ];

  // Returns pokemonList
  function getAll() {
    return pokemonList;
  }

  // Adds function adds item to pokemonList
  function add(item) {
    return pokemonList.push(item);
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list"); // uses "pokemon-list" class defined in index file
    let listItem = document.createElement("li"); // created "li" element
    let button = document.createElement("button"); // created "button" tag
    button.innerText = pokemon.name; // linked text from pokemonRepository
    button.classList.add("button-class"); // added styles defined in CSS "button-class"
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
    listItem.appendChild(button); // appended button into "li"
    pokemonList.appendChild(listItem); // appended 'li' into parent element
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  // Exposes private data in getAll, add and showDetails functions
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

// New Pokemon using pokemonRepository.add
pokemonRepository.add({
  name: "Charmander",
  height: 6,
  types: ["fire"],
});

// Filters pokemons by height.
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
