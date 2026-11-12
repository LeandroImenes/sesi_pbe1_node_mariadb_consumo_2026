const express = require("express")
const router = express.Router()

const usuarioController = require('./controllers/usuario')
const consumoController = require('./controllers/consumo')

const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}

router.get('/', rotaInicial)

// Rotas para usuario
router.get('/usuario', usuarioController.listar)
router.get('/usuario/:id', usuarioController.buscarPorId)
router.post('/usuario', usuarioController.cadastrar)
router.put('/usuario/:id', usuarioController.alterar)
router.delete('/usuario/:id', usuarioController.excluir)

// Rotas para consumo
router.get('/consumo', consumoController.listar)
router.get('/consumo/:id', consumoController.buscarPorId)
router.post('/consumo', consumoController.cadastrar)
router.put('/consumo/:id', consumoController.alterar)
router.delete('/consumo/:id', consumoController.excluir)

module.exports = router
