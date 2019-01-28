const test = require('tape')
const supertest = require('supertest')
const index = require('./index')
const Status = require('http-status')

test('GET /api/planetas - listar todos os planetas (nenhum cadastrado)', (t) => {
    supertest(index)
        .get('/api/planetas')
        .expect('Content-Type', /json/)
        .expect(Status.NOT_FOUND)
        .end((err, res) => {
            t.error(err, 'Sem erros')
            t.assert(res.body.message === "Nenhum planeta encontrado", "Listagem planetas retornou vazia")
            t.end()
        })
})

test('POST /api/planeta - cadastro com sucesso', (t) => {
    const planeta = {
        nome: "Alderaan",
        clima: "Temperado",
        terreno: "Planícies, Montanhas"
    }
    supertest(index)
        .post('/api/planeta')
        .send(planeta)
        .expect('Content-Type', /json/)
        .expect(Status.CREATED)
        .end((err, res) => {
            t.error(err, 'Sem erros')
            t.assert(res.body.message === "Planeta criado com sucesso", "Cadastro efetuado com sucesso")
            t.end()
        })
})

test('POST /api/planeta - cadastro planeta já existente', (t) => {
    const planeta = {
        nome: "Alderaan",
        clima: "Temperado",
        terreno: "Planícies, Montanhas"
    }
    supertest(index)
        .post('/api/planeta')
        .send(planeta)
        .expect('Content-Type', /json/)
        .expect(Status.INTERNAL_SERVER_ERROR)
        .end((err, res) => {
            t.error(err, 'Sem erros')
            t.assert(res.body.message === "Planeta já cadastrado", "Tentativa de cadastro de planeta ja existente")
            t.end()
        })
})

test('GET /api/planetas - listar todos os planetas', (t) => {
    supertest(index)
        .get('/api/planetas')
        .expect('Content-Type', /json/)
        .expect(Status.OK)
        .end((err, res) => {
            t.error(err, 'Sem erros')
            t.assert(res, "Listagem planetas recuperada com sucesso")
            t.end()
        })
})

test('GET /api/planeta/nome=:nome - buscarPorNome (planeta inexistente)', (t) => {
    supertest(index)
        .get('/api/planeta/nome=Mercurio')
        .expect('Content-Type', /json/)
        .expect(Status.NOT_FOUND)
        .end((err, res) => {
            t.error(err, 'Sem erros')
            t.assert(res.body.message === "Planeta não encontrado", "Planeta inexistente")
            t.end()
        })
})

var id;

test('GET /api/planeta/nome=:nome - buscarPorNome com sucesso', (t) => {
    supertest(index)
        .get('/api/planeta/nome=Alderaan')
        .expect('Content-Type', /json/)
        .expect(Status.OK)
        .end((err, res) => {
            t.error(err, 'Sem erros')
            t.assert(res.body.nome === "Alderaan", "Planeta recuperado por nome com sucesso")
            id = res.body._id
            t.end()
        })
})

test('GET /api/planeta/id=:id - buscarPorId com sucesso', (t) => {
    supertest(index)
        .get('/api/planeta/id=' + id)
        .expect('Content-Type', /json/)
        .expect(Status.OK)
        .end((err, res) => {
            t.error(err, 'Sem erros')
            t.assert(res.body._id === id, "Planeta recuperado por id com sucesso")
            t.end()
        })
})


test('DELETE /api/planeta/id=:id - remover', (t) => {
    supertest(index)
        .delete('/api/planeta/id=' + id)
        .expect('Content-Type', /json/)
        .expect(Status.OK)
        .end((err, res) => {
            t.error(err, 'Sem erros')
            t.assert(res.body.message === "Planeta removido com sucesso", "Planeta removido com sucesso")
            t.end()
        })
})

test('DELETE /api/planeta/id=:id - remover (planeta inexistente)', (t) => {
    supertest(index)
        .delete('/api/planeta/id=5c4e06e399b85f4ac49e7656')
        .expect('Content-Type', /json/)
        .expect(Status.OK)
        .end((err, res) => {
            t.error(err, 'Sem erros')
            t.assert(res.body.message === "Planeta não encontrado", "Planeta não foi encontrado para remover")
            t.end()
        })
})


