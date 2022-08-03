import {
    POKEMONS_DATA,
    SEARCH_NAME, 
    SEARCH_BY_TYPE, 
    SORT_BY_NAME, 
    FILTER_BY_DATA, 
    FILTER_BY_ATTACK, 
    POKEMON_DETAIL,
    CREATE_POKEMON,
    GET_TYPE,
    BOTON} 
from '../Actions/index.js'


const initialState = {
    pokemons: [],
    filter: [],
    searchByType: [],
    sortByName: [],
    pokemonDetail: [],
    createPokemon: [],
    pokemonsType: [],
    asd: []
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case POKEMONS_DATA:
            return {
                ...state,
                pokemons: action.payload,
                filter: action.payload,
                searchByType: action.payload,
                sortByName: action.payload,
                asd: action.payload
                
                
            }
        case SEARCH_NAME:
            return {
                ...state,
                filter: action.payload
            }
        case SORT_BY_NAME : {
            let pokemonsName = [...state.filter]
            if(action.payload === 'ascendente'){
                 pokemonsName.sort((a,b) => {
                    if(a.name > b.name) return 1
                    if(a.name < b.name) return -1
                    return 0
                })
            }
            if(action.payload === 'descendente'){
                 pokemonsName.sort((a,b) => {
                    if(a.name > b.name) return -1
                    if(a.name < b.name) return 1
                    return 0
                })
            }
            return {
                ...state,
                filter: pokemonsName
            }
        }    
        case SEARCH_BY_TYPE:
            const allPokemons = [...state.searchByType]
            const filterPokemons = action.payload === 'normal' ? state.pokemons : allPokemons.filter(p => p.types.includes(action.payload))
            return {
                ...state,
                filter: filterPokemons.length < 1 ? allPokemons.concat(alert('We couldn´t find pokemons with that type')) : filterPokemons
            }
        case FILTER_BY_DATA: 
            let allPokemonsDB = [...state.sortByName]
            let arrayFilter = []
            if(action.payload === 'apipokemons'){
                arrayFilter = allPokemonsDB.filter(p => typeof p.id !== 'string')
            }
            else if(action.payload === 'userpokemons'){
                arrayFilter = allPokemonsDB.filter(p => typeof p.id === 'string')
                if(arrayFilter.length === 0){
                    arrayFilter = ['Vacio']
                }
            }
            else if(action.payload === 'allpokemons'){
                arrayFilter = state.pokemons
            }
                      
            return {
                ...state,
                filter: arrayFilter 
            }
        case FILTER_BY_ATTACK: 
            let pokemonsAttack = [...state.filter]
            let arrayAttack = []    
            if(action.payload === 'descendente'){
                arrayAttack = pokemonsAttack.sort((a,b) => {
                    if(a.attack > b.attack) return 1
                    if(a.attack < b.attack) return -1
                    return 0
                })
            }
            if(action.payload === 'ascendente'){
                arrayAttack = pokemonsAttack.sort((a,b) => {
                    if(a.attack > b.attack) return -1
                    if(a.attack < b.attack) return 1
                    return 0
                })
            }
            return {
                ...state,
                filter: arrayAttack
            }    
        case POKEMON_DETAIL: 
            return {
                ...state,
                pokemonDetail: action.payload
            }
        case CREATE_POKEMON:
            return {
                ...state,
                createPokemon: [...state.createPokemon,{...action.payload}]
            }        
        case GET_TYPE: 
            return {
                ...state,
                pokemonsType: action.payload
            }
        case BOTON:
            const pokemons = [...state.filter]
            const boton = pokemons.filter(e => e.attack >= 60 && e.attack <= 120 && e.height >= 15)
            return {
                ...state,
                filter: boton
            }          
        default: return state     
    }
}