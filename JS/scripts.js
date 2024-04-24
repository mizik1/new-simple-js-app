// Pokemon data is private in this method by wrapping in IIFE
let pokemonRepository = (function () {
  // gets data from pokemon api
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

  // add Button utility classes for buttons created in JS
  let newButton = document.createElement("button");
  newButton.classList.add("btn", "btn-primary");
  newButton.textContent = "Click Here";
  document.body.appendChild(newButton);

  function addListItem(pokemon) {
    let containerList = document.querySelector(".pokemon-list"); // changed variable to containerList to avoid conflicts
    let listItem = document.createElement("li"); // created "li" element
    let button = document.createElement("button"); // created "button" tag
    button.innerText = pokemon.name; // linked text from pokemonRepository
    button.classList.add("button-class"); // added styles defined in CSS "button-class"
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

// OLD CODE
// Filters pokemons by height.
// pokemonRepository.loadList().then(function () {
//   pokemonRepository.getAll().forEach(function (pokemon) {
//     pokemonRepository.addListItem(pokemon);
//   });
// });
// previous showDetails function
// function showDetails(item) {
//   pokemonRepository.loadDetails(item).then(function () {
//     console.log(item);
//   });
// }

// adding modal that can show each pokemon
// function showDetails(item) {
//   pokemonRepository.loadDetails(item).then(function () {
//     showModal(item);
//     let modalContainer = document.querySelector("#modal-container");
//     let modal = document.createElement("div");
//     modal.classList.add("modal");

//     // the close button
//     let closeButton = document.createElement("button");
//     closeButton.classList.add("modal-close");
//     closeButton.innerText = "Close";
//     closeButtonElement.addEventListener("click", hideModal);

//     // the title element
//     let titleElement = document.createElement("h1");
//     titleElement.innerText = title;

//     let contentElement = document.createElement("p");
//     contentElement.innerText = text;

//     modal.appendChild(closeButtonElement);
//     modal.appendChild(titleElement);
//     modal.appendChild(contentElement);
//     modalContainer.appendChild(modal);

//     modalContainer.classList.add("is-visible");

//     // hide modal
//     function hideModal() {
//       let modalContainer = document.querySelector("#modal-container");
//       modalContainer.classList.remove("is-visible");
//     }
//     window.addEventListener("keydown", (e) => {
//       let modalContainer = document.querySelector("#modal-container");
//       if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
//         hideModal();
//       }
//     });

//     modalContainer.addEventListener("click", (e) => {
//       let target = e.target;
//       if (target === modalContainer) {
//         hideModal();
//       }
//     });

//     document.querySelector("#show-modal").addEventListener("click", () => {
//       showModal();
//     });
//   });
// }

// let closeButton = document.createElement("button");
// closeButton.innerText = "Close";
// closeButton.classList.add("modal-close");
// closeButton.addEventListener("click", () => {
//   modalContainer.classList.remove("is-visible");
// });

// adds pokemon details
// let titleElement = document.createElement("h1");
// titleElement.innerText = item.name;

// appends elements to modal
// modal.appendChild(closeButton);
// modal.appendChild(titleElement);
// modal.appendChild(imageElement);
// modal.appendChild(heightElement);

// appends modal to modalContainer
// modalContainer.appendChild(modal);

// displays modal
// modalContainer.classList.add("is-visible");
