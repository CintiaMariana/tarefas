require ('dotenv').config()

const express = require('express')
const porta = process.env.PORTA
const rotasPadrao = require('./rotas/index.js')
const rotasTarefa = require('./rotas/tarefa.js')
const app = express()

app.use(express.json())
app.use(rotasPadrao)
app.use(rotasTarefa)

app.listen(process.env.PORTA || 3000, () => {
    console.log("API rodando")
})