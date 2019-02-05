require("dotenv-safe").load()
const express = require("express")
const http = require("http")
const status = require("http-status")
const routes = require("./routes")
const bodyParser = require("body-parser")

const app = express()

app.use(express.json())

app.use("/api", routes)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((request, response, next) => {
    response.status(status.NOT_FOUND).send()
})

app.use((error, request, response, next) => {
    response.status(status.INTERNAL_SERVER_ERROR).json({ error })
})

const port = process.env.PORT || 3000

app.set("port", port)

const server = http.createServer(app)

if (require.main === module) {
    server.listen(port)
    console.log("Servidor iniciado com sucesso.")
}

module.exports = app