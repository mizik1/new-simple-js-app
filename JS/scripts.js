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

  // Exposes private data in getAll and add functions
  return {
    getAll,
    add,
  };
})();

// container for HTML
// const container = document.body;

// Filters pokemons by height. For Loop pulls from pokemonRepository (pokemon)
pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height < 1.5) {
    document.write(
      '<div class="pokemon-info">' + pokemon.name + " height: " + pokemon.height + " - Wow! This is a short pokemon! "
    );
  } else if (pokemon.height > 1.5 && pokemon.height < 4.5) {
    document.write(
      '<div class="pokemon-info">' + pokemon.name + " height: " + pokemon.height + " - Wow! This is a medium pokemon! "
    );
  } else {
    document.write(
      '<div class="pokemon-info">' + pokemon.name + " height: " + pokemon.height + " - Wow! This is a tall pokemon!"
    );
  }
});

// New Pokemon using pokemonRepository.add
pokemonRepository.add({
  name: "Charmander",
  height: 6,
  types: ["fire"],
});
