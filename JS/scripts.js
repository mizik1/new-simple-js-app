// Pokemon data is private in this method by wrapping in IIFE
let pokemonRepository = (function () {
  // gets data from pokemon api'
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20";

  // Adds function adds item to pokemonList
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  // // getAll returns data from pokemon api
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let containerList = document.querySelector(".pokemon-list"); // changed variable to containerList to avoid conflicts
    let listItem = document.createElement("li"); // created "li" element
    let col = document.createElement("div");
    col.classList.add("col-md-4");
    let button = document.createElement("button"); // created "button" tag
    button.innerText = pokemon.name; // linked text from pokemonRepository
    button.classList.add("button-class"); // added styles defined in CSS "button-class"
    col.appendChild(button);
    listItem.appendChild(button); // appended button into "li"
    containerList.appendChild(listItem); // appended 'li' into parent element
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    button.addEventListener("click", function (event) {
      console.log("%c[Debug] here", "background-color: orange; font-size: 20px; color:black;");
      showDetails(pokemon);
    });
  }

  // loadlist fetches a list of pokemon from external API and adds to pokemonList using add()
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

  // loadDetails fetches details after clicking on box
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

  // revised showDetails modal
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      let modalContainer = document.querySelector(".modal-body");
      let modalTitle = document.querySelector(".modal-title");
      modalContainer.innerHTML = "";

      let modal = document.createElement("div");

      modalTitle.innerText = item.name;

      let imageElement = document.createElement("img");
      imageElement.src = item.imageUrl;

      let heightElement = document.createElement("p");
      heightElement.innerText = "Height: " + item.height + " meters";

      // appends elements to modal
      modal.appendChild(imageElement);
      modal.appendChild(heightElement);
      // appends modal to modal container
      modalContainer.appendChild(modal);
    });
  }

  // search bar

  // Function to filter Pokemon based on search input
  function filterPokemon(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    return pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase().includes(searchTerm);
    });
  }

  // Function to handle search and display results
  function handleSearch() {
    const searchInput = document.querySelector("#searchInput");
    const searchValue = searchInput.value.trim();

    // Clear previous search results
    const containerList = document.querySelector(".pokemon-list");
    containerList.innerHTML = "";

    // Filter Pokemon based on search term
    const filteredPokemon = filterPokemon(searchValue);

    // Display filtered Pokemon
    filteredPokemon.forEach(function (pokemon) {
      addListItem(pokemon);
    });
  }

  // Event listener for search input
  document.querySelector("#searchForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    handleSearch();
  });

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

document.addEventListener("DOMContentLoaded", function () {
  console.log("HEY");
  pokemonRepository.loadList().then(function () {
    // Now the data is loaded
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
});
