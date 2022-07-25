const { Router } = require('express');
const {Pokemon,Type} = require('../db.js');
const {dbTypesPokemons} = require('../utils/utils.js')
const router = Router();

router.get('/', async (req,res, next) => {
    await dbTypesPokemons()
    try {
        const allTypes = await Type.findAll({
            attributes:{
                exclude: ['Pokemon_Tipo']
            },
            includes: {
                model: Pokemon
            }
        })
        res.send(allTypes.map(t => {
            return {
                id: t.id,
                name: t.name,
            }
        }))
        
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req,res, next) => {
    try {
        const { name } = req.body
        if(!name) return res.status(404).json({msg: 'You must enter a name'})
        const dbTypeCreate = await Type.create({
            name,
        })
        res.status(201).json(dbTypeCreate)
    } catch (error) {
        next(error)
    }
})


module.exports = router