const axios = require('axios')
const {Pokemon, Type} = require('../db.js')

const apiPokemonsData = async () => {
    try {
        let arrayPokemons = []
        let apiPokemons = await  axios.get('https://pokeapi.co/api/v2/pokemon')
        let apiPokemonsB = await axios.get(apiPokemons.data.next)
        const apiPokemonsFull = apiPokemons.data.results.concat(apiPokemonsB.data.results)
        const apiUrlPokemons = apiPokemonsFull.map(data => axios.get(data.url))
        let apiPokemonsFinal = axios.all(apiUrlPokemons).then( p => {
            p.map(e => {
                arrayPokemons.push({
                    id: e.data.id,
                    name: e.data.name,
                    health: e.data.stats[0].base_stat,
                    attack: e.data.stats[1].base_stat,
                    defense: e.data.stats[2].base_stat,
                    speed: e.data.stats[5].base_stat,
                    height: e.data.height,
                    weight: e.data.weight,
                    types: e.data.types.map(m => m.type.name),
                    img: e.data.sprites.other.dream_world.front_default
                })
        })
        return arrayPokemons
    })
    return apiPokemonsFinal
    } catch (error) {
        console.log(error)
    }
       
}

const dbPokemonsData = async () => {
    
    try {
        let dbPokemons = await Pokemon.findAll({
            include: Type        
    })
        dbPokemons = dbPokemons.map((p) => {
            return {
                id: p.id,
                name: p.name,
                health: p.health,
                attack: p.attack,
                defense: p.defense,
                speed: p.speed,
                height: p.height,
                weight: p.weight,
                types: p.types.map(e => e.name),
                img: p.img
            }
        })
        return dbPokemons
    } catch (error) {
        console.log(error)
    }
}

const allPokemonsData = async () => {
    const apiPokemons = await apiPokemonsData()
    const dbPokemons = await dbPokemonsData()
    const allPokemons = [...apiPokemons,...dbPokemons]
    return allPokemons
}

const dbTypesPokemons = async () => {
    try {
        let typesArray = []
        const apiTypesPokemons = await axios.get('https://pokeapi.co/api/v2/type')
        apiTypesPokemons.data.results.map((t) => {
            typesArray.push({
                id: t.id,
                name: t.name
            })
    })
        let dbTypes = await Type.findAll()
        dbTypes = dbTypes.map((t) => {
            return {
                id: t.id,
                name: t.name
            }
        })
    if(dbTypes.length === 0){
        await Type.bulkCreate(typesArray)
        
    }
    } catch (error) {
        console.log(error)
    }
    
    
}
    
module.exports = {
    allPokemonsData,
    dbPokemonsData,
    apiPokemonsData,
    dbTypesPokemons
    
}