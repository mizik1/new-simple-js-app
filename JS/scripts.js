let pokemonList = [
  { name: "Bulbasur", height: 2.04, types: ["grass", "poison"] },
  { name: "Charizard", height: 5.07, types: ["fire", "flying"] },
  { name: "Squirtle", height: 1.08, types: ["water"] },
];

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height < 1.5) {
    document.write(pokemonList[i].name + " height: " + pokemonList[i].height + " - Wow! This is a short pokemon! ");
  } else if (pokemonList[i].height > 1.5 && pokemonList[i].height < 4.5) {
    document.write(pokemonList[i].name + " height: " + pokemonList[i].height + " - Wow! This is a medium pokemon! " + "<br>");
  } else {
    document.write(pokemonList[i].name + " height: " + pokemonList[i].height + " - Wow! This is a tall pokemon!" + "<br>");
  }
}
