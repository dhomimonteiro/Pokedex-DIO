const pokemonCard = document.getElementById('cardDetail')
const section = document.getElementById('content')


function openPokemonCard(number) {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${number}`;

    fetch(pokemonUrl)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
        .then((pokemonDetails) => {

            let pokemonWeight = String(pokemonDetails.weight)
            if(pokemonWeight.length > 1){
                pokemonWeight = pokemonWeight.substring(0, pokemonWeight.length -1) + '.' + pokemonWeight.substring(pokemonWeight.length - 1)
            }
            
            let pokemonHeight = String(pokemonDetails.height)
            if(pokemonHeight.length == 1){
                pokemonHeight = '0.' + pokemonHeight.substring(pokemonHeight.length - 1)
            }else if (pokemonHeight.length > 1){
                pokemonHeight = pokemonHeight.substring(0, pokemonHeight.length -1) + '.' + pokemonHeight.substring(pokemonHeight.length - 1)
            }

            pokemonCard.style.display = 'flex';
            pokemonCard.innerHTML = `
                    <div id="card" class="pokemon ${pokemonDetails.type}">
                        <span id="closeButton" onclick="closePokemonCard()">X</span>
                        <div class="top-content">
                            <h2 class="name">${pokemonDetails.name}</h2>
                            <span class='numberCard'>#${pokemonDetails.number}</span>
                        </div>
                        <ol class="types">
                            ${pokemonDetails.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemonDetails.photo}" alt="">
                        <div class="details">
                            <div class="buttons">                            
                                <button class="tablink" onclick="openTab('about')">About</button>
                                <button class="tablink" onclick="openTab('stats')">Stats</button>
                                <button class="tablink" onclick="openTab('moves')">Moves</button>
                            </div>
        
                            <div id="about" class="tabcontent">
                                <div class="info height">
                                    <p class="infoName">Height</p>
                                    <p>${pokemonHeight} m</p>
                                </div>
                                <div class="info weight">
                                    <p class="infoName">Weight</p>
                                    <p>${pokemonWeight} kg</p>
                                </div>
                                <div class="info abilities">
                                    <p class="infoName">Abilities</p>
                                    ${pokemonDetails.abilities.map((ability) => `<p class="ability ${ability}">${ability}</p>`).join('')}
                                </div>                      
                            </div>
                            <div id="stats" class="tabcontent hidden">
                                ${pokemonDetails.stats.map((stat) => 
                                    `<div class="info ${stat}">
                                    <p>${stat}</p>
                                    <div class="skill-bar">
                                        <div class="skill" style="width:${pokemonDetails.base_stats[pokemonDetails.stats.indexOf(stat)]}%"></div>
                                    </div>
                                </div>`).join('')}     
                            </div>
                            <div id="moves" class="tabcontent hidden">
                            <div class="info">
                             ${pokemonDetails.moves.map((move) => `<p class="move">${move}</p>`).join('')}    
                             </div>
                            </div>
                            
                        </div>
                    </div>
                            `
                        
        })
}



function openTab(tab){
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(tab).style.display = "block";
}

function closePokemonCard() {
    pokemonCard.style.display = 'none';
}