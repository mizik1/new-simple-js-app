// pokemon array
let pokemonList = [
  { name: "Bulbasur", height: 2.04, types: ["grass", "poison"] },
  { name: "Charizard", height: 5.07, types: ["fire", "flying"] },
  { name: "Squirtle", height: 1.08, types: ["water"] },
];

// container for HTML
const container = document.body;

// Categorizes pokemons by height
pokemonList.forEach(function (pokemon) {
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
