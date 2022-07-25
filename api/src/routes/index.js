const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Pokemon = require('./pokemon.js')
const Type = require('./type.js')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemon', Pokemon );
router.use('/type', Type)
module.exports = router;
