let pokemonRepository = (function () {
  let e = [];
  function t(t) {
    "object" == typeof t && "name" in t ? e.push(t) : console.log("pokemon is not correct");
  }
  function n() {
    return e;
  }
  function o(e) {
    let t = document.querySelector(".pokemon-list"),
      n = document.createElement("li"),
      o = document.createElement("div");
    o.classList.add("col-md-4");
    let i = document.createElement("button");
    (i.innerText = e.name),
      i.classList.add("button-class"),
      o.appendChild(i),
      n.appendChild(i),
      t.appendChild(n),
      i.setAttribute("data-toggle", "modal"),
      i.setAttribute("data-target", "#exampleModal"),
      i.addEventListener("click", function (t) {
        console.log("%c[Debug] here", "background-color: orange; font-size: 20px; color:black;"), r(e);
      });
  }
  function r(e) {
    pokemonRepository.loadDetails(e).then(function () {
      let t = document.querySelector(".modal-body"),
        n = document.querySelector(".modal-title");
      t.innerHTML = "";
      let o = document.createElement("div");
      n.innerText = e.name;
      let r = document.createElement("img");
      r.src = e.imageUrl;
      let i = document.createElement("p");
      (i.innerText = "Height: " + e.height + " meters"), o.appendChild(r), o.appendChild(i), t.appendChild(o);
    });
  }
  return (
    document.querySelector("#searchForm").addEventListener("submit", function (t) {
      t.preventDefault(),
        (function t() {
          var n;
          let r = document.querySelector("#searchInput"),
            i = r.value.trim(),
            l = document.querySelector(".pokemon-list");
          l.innerHTML = "";
          let a =
            ((n = (n = i).toLowerCase()),
            e.filter(function (e) {
              return e.name.toLowerCase().includes(n);
            }));
          a.forEach(function (e) {
            o(e);
          });
        })();
    }),
    {
      add: t,
      getAll: n,
      addListItem: o,
      loadList: function e() {
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=154")
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
            console.log(e), (t.imageUrl = e.sprites.front_default), (t.height = e.height), (t.types = e.types);
          })
          .catch(function (e) {
            console.error(e);
          });
      },
      showDetails: r,
    }
  );
})();
document.addEventListener("DOMContentLoaded", function () {
  console.log("HEY"),
    pokemonRepository.loadList().then(function () {
      pokemonRepository.getAll().forEach(function (e) {
        pokemonRepository.addListItem(e);
      });
    });
});
