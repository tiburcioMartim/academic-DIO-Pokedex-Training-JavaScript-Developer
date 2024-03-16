const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 12;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {

            const newHTML = pokemons.map((pokemon) => {
                const typesHTML = pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('');
                const statsHTML = pokemon.stats.map((stat, i) => `<li class="stat">${stat}<br>${pokemon.statsValue[i]}</li>`).join('');

                return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">${pokemon.numberPoke}</span>
                <span class="namePokemon">${pokemon.name}</span>
        
                <div class="detail">
                    <ol class="types">
                        ${typesHTML} 
                    </ol>
                    
                    <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
                </div>
                
                <ol class="stats-value">
                    ${statsHTML}
                </ol>
            </li>
            `;
            }).join('');

            pokemonList.innerHTML += newHTML
        });
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})