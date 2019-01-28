const database = require('../database')
var ObjectId = require('mongodb').ObjectID;

function adicionar(planeta, callback) {

    database.connect((err, db) => {

        if (err) {
            return callback({ message: "Erro ao conectar com banco: " + err }, null)
        }
        var colecao = db.collection("planetas");

        var planeta_ins = {
            nome: planeta.nome,
            clima: planeta.clima,
            terreno: planeta.terreno,
            aparicoesEmFilmes: 0
        }
        colecao.insertOne(planeta_ins, function (erro, resultado) {
            database.disconnect()
            if (erro)
                return callback({ message: "Erro ao inserir planeta: " + erro }, null)
            else
                return callback(null, { message: "Planeta criado com sucesso" })
        })
    })
}

function buscarPorId(id, callback) {

    database.connect((err, db) => {

        if (err) {
            return callback({ message: "Erro ao conectar com banco: " + err }, null)
        }
        var colecao = db.collection("planetas");

        colecao.findOne({ _id: ObjectId(id) }, function (erro, resultado) {
            database.disconnect()
            if (erro) {
                return callback({ message: "Erro ao buscar planeta: " + erro }, null)
            } else {
                return callback(null, resultado)
            }
        })
    })
}

function buscarPorNome(nome, callback) {

    database.connect((err, db) => {

        if (err) {
            return callback({ message: "Erro ao conectar com banco: " + err }, null)
        }
        var colecao = db.collection("planetas");
        var filtro = { nome: nome }

        colecao.findOne(filtro, function (erro, resultado) {
            database.disconnect()
            if (erro) {
                return callback({ message: "Erro ao buscar planeta: " + erro }, null)
            } else {
                return callback(null, resultado)
            }
        })
    })
}

function alterarAparicoesFilmes(planeta, callback) {

    database.connect((err, db) => {

        if (err) {
            return callback({ message: "Erro ao conectar com banco: " + err }, null)
        }
        var planeta_alt = {
            $set: {
                aparicoesEmFilmes: planeta.aparicoesEmFilmes
            }
        }
        var colecao = db.collection("planetas");
        var filtro = { nome: planeta.nome }

        colecao.updateOne(filtro, planeta_alt, function (erro, resultado) {
            database.disconnect()
            if (erro) {
                return callback({ message: "Erro ao alterar planeta: " + erro }, null)
            } else {
                return callback(null, { message: "Planeta alterado com sucesso" })
            }
        })
    })
}

function listar(callback) {

    database.connect((err, db) => {

        if (err) {
            return callback({ message: "Erro ao conectar com banco: " + err }, null)
        }
        var colecao = db.collection("planetas");
        var filtro = {}

        colecao.find(filtro).toArray(function (erro, planetas) {
            database.disconnect()
            if (erro) {
                return callback({ message: "Erro ao listar planetas: " + erro }, null)
            } else {
                return callback(null, planetas)
            }
        })
    })
}

function remover(id, callback) {

    database.connect((err, db) => {

        if (err) {
            return callback({ message: "Erro ao conectar com banco: " + err }, null)
        }
        var colecao = db.collection("planetas");

        colecao.deleteOne({ _id: ObjectId(id) }, function (erro, resultado) {
            database.disconnect()
            if (erro)
                return callback({ message: "Erro ao remover planeta: " + erro }, null)
            if (resultado.deletedCount > 0)
                return callback(null, { message: "Planeta removido com sucesso" })
            else
                return callback(null, { message: "Planeta não encontrado" })
        })
    })
}

module.exports = { adicionar, buscarPorId, buscarPorNome, alterarAparicoesFilmes, listar, remover }