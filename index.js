const URL = 'https://pokeapi.co/api/v2/pokemon';
async function getAllPokemon (){
    const pokemonList = await 
    fetch(URL)
        .then(response => response.json())  // convertir a json
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

    getPokemonInfo(pokemonList.results);
}

function getPokemonInfo(pokemonList){
    pokemonList.forEach(async (element) => {
            const pokemon = await
            fetch(`${URL}/${element.name}`)
                .then(response => response.json())  // convertir a json
                .catch(err => console.log('Solicitud fallida', err));
            createCard(element.name.toLowerCase(), pokemon.sprites.front_default);
        }
    );    
}

function createCard(name, image){
    var containerDiv = document.getElementById("container");
    
    var newDiv = document.createElement("div");
    newDiv.classList.add('card');

    var imageContent = document.createElement("img");
    imageContent.setAttribute('src', image);
    imageContent.setAttribute('width', '192px');
    imageContent.setAttribute('height',  '192px');
    imageContent.classList.add('image');
    newDiv.appendChild(imageContent);

    var pokemonNameContainer = document.createElement("p");
    var pokemonName = document.createTextNode(name); 
    pokemonNameContainer.classList.add('pokemon-name');
    pokemonNameContainer.setAttribute('id',  `notification-${name}`);
    pokemonNameContainer.appendChild(pokemonName);
    newDiv.appendChild(pokemonNameContainer);

    containerDiv.appendChild(newDiv);

    initializeUi(`notification-${name}`, name, image);

}
getAllPokemon();
