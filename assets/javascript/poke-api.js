const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()    
    pokemon.numberPoke = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    const types = pokeDetail.types.map((typeSlot => typeSlot.type.name))
    const [type] = types    
    pokemon.types = types
    pokemon.type = type
    
    const stats = pokeDetail.stats.slice(0,3).map((statsSlot => statsSlot.stat.name))
    const [stat] = stats
    pokemon.stats = stats
    pokemon.stat = stat
    
    pokemon.statsValue = pokeDetail.stats.slice(0,3).map((statsVal => statsVal.base_stat))

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((convertPokeApiDetailToPokemon))
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
}

