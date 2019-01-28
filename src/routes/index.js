const express = require('express')
const controller = require('../controller')

const router = express.Router()

router.post('/planeta', controller.adicionar)
router.delete('/planeta/id=:id', controller.remover)
router.get('/planeta/id=:id', controller.buscarPorId)
router.get('/planeta/nome=:nome', controller.buscarPorNome)
router.get('/planetas', controller.listar)

module.exports = router