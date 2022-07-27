import axios from 'axios'
import { routePokemon, filterByName,filterByType, postPokemon } from '../../Constantes'

export const POKEMONS_DATA = 'POKEMONS_DATA'
export const SEARCH_NAME = 'SEARCH_NAME'
export const GET_TYPE = 'GET_TYPE'
export const SEARCH_BY_TYPE = 'SEARCH_BY_TYPE'
export const SORT_BY_NAME = 'SORT_BY_NAME'
export const FILTER_BY_DATA = 'FILTER_BY_DATA'
export const FILTER_BY_ATTACK = 'FILTER_BY_ATTACK'
export const POKEMON_DETAIL = 'POKEMON_DETAIL'
export const CREATE_POKEMON = 'CREATE_POKEMON'

export function getPokemons(){
    return function(dispatch){
        axios.get(routePokemon)
        .then(detalle => dispatch({
            type: POKEMONS_DATA,
            payload: detalle.data
        }))
    }
}

export function getPokemonByName(name){
    return async function (dispatch){
        await axios.get(filterByName + name)
        .then(detalle => dispatch({
            type: SEARCH_NAME,
            payload: detalle.data
        }))
    }
}

export function getTypes(){
    return async function(dispatch){
        await axios.get(filterByType)
        .then(detalle => dispatch({
            type: GET_TYPE,
            payload: detalle.data
        }))
    }
}

export function searchByType(data){
    return {
        type: SEARCH_BY_TYPE,
        payload: data
    }
}

export function sortByName(data){
    return {
        type: SORT_BY_NAME,
        payload: data
    }
}

export function filterByCreaction(data){
    return {
        type: FILTER_BY_DATA,
        payload: data
    }
}

export function filterByAttack(data) {
    return {
        type: FILTER_BY_ATTACK,
        payload: data
    }
}

export function getPokemonDetails(id) {
    return function  (dispatch){
        axios.get(routePokemon + id)
        .then(detalle => dispatch({
            type: POKEMON_DETAIL,
            payload: detalle.data
        }))
    }
}

export function createPokemon(pokemonData) {
    return async function (dispatch){
         await axios.post(postPokemon, pokemonData)
        .then(detalle => dispatch({
            type: CREATE_POKEMON,
            payload: detalle.data
        }))
    }
}



