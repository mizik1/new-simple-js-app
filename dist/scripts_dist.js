let pokemonRepository = (function () {
  let e = [];
  function t(t) {
    "object" == typeof t && "name" in t ? e.push(t) : console.log("pokemon is not correct");
  }
  function n() {
    return e;
  }
  function o(e) {
    pokemonRepository.loadDetails(e).then(function () {
      let t = document.querySelector(".modal-body"),
        n = document.querySelector(".modal-title");
      t.innerHTML = "";
      let o = document.createElement("div");
      n.innerText = e.name;
      let i = document.createElement("img");
      i.src = e.imageUrl;
      let r = document.createElement("p");
      (r.innerText = "Height: " + e.height + " meters"), o.appendChild(i), o.appendChild(r), t.appendChild(o);
    });
  }
  return {
    add: t,
    getAll: n,
    addListItem: function e(t) {
      let n = document.querySelector(".pokemon-list"),
        i = document.createElement("div");
      i.classList.add("col-md-4", "mb-4");
      let r = document.createElement("button");
      (r.innerText = t.name),
        r.classList.add("btn", "btn-primary", "pokemon-btn"),
        i.appendChild(r),
        n.appendChild(i),
        r.setAttribute("data-toggle", "modal"),
        r.setAttribute("data-target", "#exampleModal"),
        r.addEventListener("click", function (e) {
          console.log("%c[Debug] here", "background-color: orange; font-size: 20px; color:black;"), o(t);
        });
    },
    loadList: function e() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=20")
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            let n = { name: e.name, detailsUrl: e.url };
            t(n), console.log(n);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadDetails: function e(t) {
      return fetch(t.detailsUrl)
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          (t.imageUrl = e.sprites.front_default), (t.height = e.height), (t.types = e.types);
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    showDetails: o,
  };
})();
document.addEventListener("DOMContentLoaded", function () {
  console.log("HEY"),
    pokemonRepository.loadList().then(function () {
      pokemonRepository.getAll().forEach(function (e) {
        pokemonRepository.addListItem(e);
      });
    });
});
