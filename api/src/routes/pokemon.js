const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');
const router = Router();
const {allPokemonsData, apiPokemonsData} = require('../utils/utils.js')

router.get('/', async (req,res) => {
   const { name } = req.query

   try {
    if(name){
        const allPokemons = await allPokemonsData()
        const filtrarPokemons = allPokemons.filter(p => p.name.toLowerCase() === name.toLowerCase())
        if(filtrarPokemons.length === 0){
            res.send('We couldn`t find a Pokemon with that name')
            
        } else {
            return res.status(200).json(filtrarPokemons)
        }
    }
    else {
        const noFilterPokemons = await allPokemonsData()
        return res.status(200).json(noFilterPokemons)
   }
   } catch (error) {
        res.status(400).send({msg: 'We couldn`t find de request of Pokemons'})
   }
})

router.post('/', async (req,res, next) => {
    try {
        const {name,health,attack,defense, speed,height,weight,img} = req.body
        if(!name) return res.status(400).send('You must enter a name')
        const apiNames = await apiPokemonsData()
        // console.log(apiNames.name)
        const searchFilter = apiNames.filter(e => e.name === name)
        // console.log(searchFilter)
        if(searchFilter[0]){
            res.send('This name already exist')
        }else{
          
        const nuevoPokemon = await Pokemon.create({
            name,
            health,
            attack,
            defense,
            speed,
            height,
            weight,
            img,
        })

        let dbTypes = await Type.findAll({
            where: { name: req.body.types },                     // MODIFICAR ESTO PARA QUE NO TIRE UNDEFINED
        })
        
        await nuevoPokemon.addType(dbTypes)
        res.status(201).json(nuevoPokemon)
        }
    } catch (error) {
        // next(console.log('esta entrando aca'))
        next(error)
        
    }
})

router.get('/:id', async (req,res,next) => {
    try {
        const { id } = req.params
        if(id){
            const apiPokemons = await allPokemonsData()
            const filtrarById = apiPokemons.filter(p => p.id == id)
            if(filtrarById){
                return res.status(200).send(filtrarById)

            }else {
                return res.status(404).send('We couldn`t find yout Pokemon')
            }
        }
       
    } catch (error) {
        next(error)
    }
})

module.exports = router