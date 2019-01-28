const dao = require('../dao')
const Status = require('http-status')
const swapi = require('swapi-node')

function procuraPlanetaSwapi(planeta, result) {

    result.results.forEach(function (planet) {
        if (planet.name.toUpperCase() === planeta.nome.toUpperCase()) {
            planeta.aparicoesEmFilmes = planet.films.length

            dao.alterarAparicoesFilmes(planeta, (err, result) => {
                if (err) {
                    response.status(Status.INTERNAL_SERVER_ERROR).send(err)
                }
                if (result) {
                    console.log(result)
                }
            })
            return
        }
    }, this)

    return result.nextPage().then((result) => {
        procuraPlanetaSwapi(planeta, result)
    }).catch((err) => {
        return
    })
}

exports.adicionar = (request, response, next) => {

    var planeta = {
        nome: request.body.nome,
        clima: request.body.clima,
        terreno: request.body.terreno,
        aparicoesEmFilmes: 0
    }
    dao.buscarPorNome(planeta.nome, (err, result) => {
        if (err) {
            response.status(Status.INTERNAL_SERVER_ERROR).send(err)
        }
        if (result) {
            response.status(Status.INTERNAL_SERVER_ERROR).send({ message: "Planeta já cadastrado" })
        } else {

            dao.adicionar(planeta, (err, result) => {
                if (err) {
                    response.status(Status.INTERNAL_SERVER_ERROR).send(err)
                }
                if (result) {
                    response.status(Status.CREATED).send(result)

                    swapi.get("https://swapi.co/api/planets").then((result) => {
                        procuraPlanetaSwapi(planeta, result)
                    })
                }
            })
        }
    })
}

exports.buscarPorId = (request, response, next) => {

    var id = request.params.id

    dao.buscarPorId(id, (err, result) => {
        if (err) {
            response.status(Status.INTERNAL_SERVER_ERROR).send(err)
        }
        if (result) {
            response.status(Status.OK).send(result)
        } else {
            response.status(Status.NOT_FOUND).send({ message: "Planeta não encontrado" })
        }
    })
}

exports.buscarPorNome = (request, response, next) => {

    var nome = request.params.nome

    dao.buscarPorNome(nome, (err, result) => {
        if (err) {
            response.status(Status.INTERNAL_SERVER_ERROR).send(err)
        }
        if (result) {
            response.status(Status.OK).send(result)
        } else {
            response.status(Status.NOT_FOUND).send({ message: "Planeta não encontrado" })
        }
    })
}

exports.listar = (request, response, next) => {

    dao.listar((err, result) => {
        if (err) {
            response.status(Status.INTERNAL_SERVER_ERROR).send(err)
        }
        if (result.length === 0) {
            response.status(Status.NOT_FOUND).send({ message: "Nenhum planeta encontrado" })
        } else {
            response.status(Status.OK).send(result)
        }
    })
}

exports.remover = (request, response, next) => {

    var id = request.params.id

    dao.remover(id, (err, result) => {
        if (err) {
            response.status(Status.INTERNAL_SERVER_ERROR).send(err)
        }
        if (result) {
            response.status(Status.OK).send(result)
        }
    })
}