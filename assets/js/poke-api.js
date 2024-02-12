const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;

    pokemon.weight = pokeDetail.weight;
    pokemon.height = pokeDetail.height;

    const abilities = pokeDetail.abilities.map((typeSlot) => typeSlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type

    const stats = pokeDetail.stats.map((statSlot) => statSlot.stat.name)
    const [stat] = stats;
    const base_stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat);
    const [base_stat] = base_stats;

    pokemon.stats = stats;
    pokemon.stat = stat;
    pokemon.base_stats = base_stats;
    pokemon.base_stat = base_stat;

    const moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name);
    const [move] = moves;

    pokemon.moves = moves;
    pokemon.move = move;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
};