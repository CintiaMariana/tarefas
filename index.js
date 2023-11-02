require ('dotenv').config()

const express = require('express')
const porta = process.env.PORTA

const swaggerui = require('swagger-ui-express')
const swaggerFile = require('./swaggerOutput.json')

const registrarLogMiddleware = require('./middlewares/registrarLogMiddleware')

const rotasPadrao = require('./rotas/index.js')
const rotasTarefa = require('./rotas/tarefa.js')

const app = express()

app.use(express.json())

app.use(express.json())

app.use(registrarLogMiddleware)

app.use('/docs', swaggerui.serve)

app.use(rotasPadrao)
app.use(rotasTarefa)

app.get("/", (req, res) => {
    res.send("API executando...")
})

app.use((req, res, next)=> {
    console.log('Time:', Date.now())
    next()
})

app.get('/docs', swaggerui.setup(swaggerFile))


 app.listen(process.env.PORTA || 3000, () => {
    console.log("API rodando")
 })