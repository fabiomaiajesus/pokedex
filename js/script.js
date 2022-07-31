const pokemonName = document.querySelector('.main__pokemon__data__name');
const pokemonNumber = document.querySelector('.main__pokemon__data__number');
const pokemonImage = document.querySelector('.main__pokemon__image');
const form = document.querySelector('.main__pokemon__form');
const input = document.querySelector('.main__pokemon__input');
const btnnext = document.querySelector('.main__pokemon__buttons__btnnext');
const btnprev = document.querySelector('.main__pokemon__buttons__btnprev');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Buscando';
    pokemonNumber.innerHTML = '';


    const data = await fetchPokemon(pokemon)
        
    if (data.id < 650){
        pokemonImage.style.display='block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id
        }  else {
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
        input.value='';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase()) 
});

btnnext.addEventListener('click', () => {
   searchPokemon += 1;
   renderPokemon(searchPokemon);
});

btnprev.addEventListener('click', () => {
    if (searchPokemon >1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }    
});

renderPokemon(searchPokemon);

