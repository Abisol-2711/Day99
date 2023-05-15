const CARDS = 10;

for (let i = 1; i <= CARDS; i++) {
  let id = getRandomId(150);
  searchPokemonById(id);
}

function getRandomId(max) {
  return Math.floor(Math.random() * max) + 1;
}

let draggableElements = document.querySelector(".draggable-elements");
// console.log(draggableElements);
let droppableElements = document.querySelector(".droppable-elements");
// console.log(droppableElements);

//Array de pokemons
let pokemonSearched = [];

//Array de los nombres de pokemons
let pokemonNames = [];

async function searchPokemonById(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await res.json();
  pokemonSearched.push(data);
  pokemonNames.push(data.name);

  // console.log(pokemonNames);

  pokemonNames = pokemonNames.sort(() => Math.random() - 0.5);

  // console.log(pokemonNames);

  //Agregado de pokemons
  draggableElements.innerHTML = "";
  pokemonSearched.forEach((pokemon) => {
    // console.log(pokemon.sprites.other["official-artwork"].front_default);
    draggableElements.innerHTML += `
    <div class="pokemon">
          <img draggable="true" class="image" id="${pokemon.name}" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="pokemon" />
        </div>
    `;
  });

  //Agregado de los nombres de pokemons
  droppableElements.innerHTML = "";
  pokemonNames.forEach((name) => {
    droppableElements.innerHTML += `
    <div class="names">
          <p>${name}</p>
        </div>
    `;
  });

  let pokemons = document.querySelectorAll(".image");

  pokemons = [...pokemons];
  pokemons.forEach((pokemon) => {
    pokemon.addEventListener("dragstart", (event) => {
      // console.log(event);
      event.dataTransfer.setData("text", event.target.id);
    });
  });

  let names = document.querySelectorAll(".names");
  let wrongMsg = document.querySelector(".wrong");
  let points = 0;

  names = [...names];
  names.forEach((name) => {
    name.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    name.addEventListener("drop", (event) => {
      // console.log(event);

      const draggableElementData = event.dataTransfer.getData("text");
      let pokemonElement = document.querySelector(`#${draggableElementData}`);

      if (event.target.innerText == draggableElementData) {
        // console.log("si");
        points++;
        event.target.innerHTML = " ";
        event.target.appendChild(pokemonElement);
        wrongMsg.innerText = "";

        if (points == CARDS) {
          draggableElements.innerHTML = `<p class="win">Ganaste :)</p>`;
        }
      } else {
        // console.log("no");
        wrongMsg.innerText = "Ups!";
      }
    });
  });
}
