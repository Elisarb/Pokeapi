const in$$ = document.querySelector('input');
let bt$$ = document.getElementById("bto");
let btAll = document.getElementById("show-all");
let spinner = document.getElementById("spinner")
let flipButton = document.getElementById("flip-button");
const types = document.querySelectorAll(".dropdown-item");


function traer(){
    
    spinner.style.display = "block";
            if(in$$.value != ""){
        traerUno()
    }else{
        traerVarios()
    }
}


function traerUno(){
    let busqueda = in$$.value
        fetch("https://pokeapi.co/api/v2/pokemon/" + busqueda)
        .then (res => res.json())
        .then(data =>{   
            eliminarAnterior()
            crearPokemon(data)
            spinner.style.display = "none";
        })   
        
    }
         


const traerVarios = async () => {
    eliminarAnterior()
    spinner.style.display = "none";
    for (let i=1;i <= 150; i++){
        var res = await fetch("https://pokeapi.co/api/v2/pokemon/"+ i);
        var data = await res.json();
        crearPokemon(data);

    }
    
}
   



function crearPokemon(pokemon){
    
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card")

    cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container")
    cardContainer.classList.add("col")
    cardContainer.classList.add("col-3")

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div")
    card.classList.add("tarjeta");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    const pokeImage = document.createElement("img");
    pokeImage.setAttribute("src", pokemon.sprites.front_default)
    pokeImage.classList.add("imagen");

    const name = document.createElement("h3");
    name.classList.add("nombre-pokemon")
    name.textContent = pokemon.name.toString().toUpperCase();

    const id = document.createElement("h3");
    id.textContent = "#" + pokemon.id.toString().padStart(3,0);

    imgContainer.appendChild(pokeImage);
    card.appendChild(imgContainer);
    card.appendChild(name);
    card.appendChild(id);
    
    const nameBack = document.createElement("h3");
    nameBack.classList.add("nombre-pokemon")
    nameBack.textContent = pokemon.name.toString().toUpperCase();
    


    const cardBack = document.createElement("div");
    cardBack.classList.add("tarjeta-back")

    const textoBack = document.createElement("div");
    cardBack.classList.add("texto-back")

    const pokeBall = document.createElement("svg");
    pokeBall.classList.add("poke-ball");

    for (i=0;i<pokemon.types.length;i++){
        const p = document.createElement("p");
        p.classList.add("type-pokemon")
        p.textContent = pokemon.types[i].type.name.toString();
        textoBack.appendChild(p);
    }
    cardBack.appendChild(textoBack);
    cardBack.appendChild(nameBack);
    cardBack.appendChild(pokeBall);

    
    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);

    document.getElementById("lol").appendChild(flipCard);
    
    

}

async function traerTipos(type) {
    eliminarAnterior()

    spinner.style.display = "none";
    var res = await fetch("https://pokeapi.co/api/v2/type/" + type);
    var data = await res.json();

    for (let i=0;i <= 50; i++){
        var res2 = await fetch(data.pokemon[i].pokemon.url);
        var data2 = await res2.json();
        crearPokemon(data2);

    }
    
}

function eliminarAnterior(){
    while (document.getElementById("lol").firstChild) {
        document.getElementById("lol").firstChild.remove()
}
}

function flip (){
    let contenedor = document.querySelectorAll(".card-container");
    for (let i=0;i<contenedor.length;i++){
        if (contenedor[i].classList.contains("flipped") == true){
            contenedor[i].classList.remove("flipped");
        }else{
            contenedor[i].classList.add("flipped");
        }
    }   
    
}

traerVarios();

flipButton.addEventListener("click",flip,false);
btAll.addEventListener("click",traerVarios,false);
bt$$.addEventListener("click", traer, false);