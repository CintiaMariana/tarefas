const {tarefaRepositorio} = require('../repositorios/tarefa')
const repositorio = tarefaRepositorio()

const Router = require('express').Router()

Router.get("/tarefa",(req, res) => {
    try{
        
        const tarefas = repositorio.getAll()
        res.send(tarefas)
    } catch(err){
        console.error(err)
        res.status(500).send("Erro ao buscas as tarefas")
    }
})

Router.get("/tarefa/:id", (req, res) => {
    try{
        const {id} = req.params

        const tarefa = repositorio.get(id)

        res.send(tarefa)
    } catch(err){
        const dadosDoErro = JSON.parse(err.message)

        res.status(dadosDoErro.status).send(dadosDoErro.msg)
    }
})

Router.post("/tarefa", (req, res) => {
    try{
        const dados = req.body

        const tarefaCriada = repositorio.create(dados)

        res.send(tarefaCriada)
    }catch(err){
        res.status(400).send(err.message)
    }
})

Router.put("/tarefa/:id", (req, res) => {
    try{
        const {id} = req.params
        const dados = req.body
        const tarefaAtualizada = repositorio.update(id, dados)
        res.send(tarefaAtualizada)
    } catch(err){
        res.status(400).send(err.message)
    }
})

Router.patch("/tarefa/:id", (req, res) => {
    try{
        const {id} = req.params
        const dados = req.body
        const tarefaAtualizada = repositorio.patch(id, dados)
        res.send(tarefaAtualizada)
    } catch(err){
        res.status(400).send(err.message)
    }
})

Router.delete("/tarefa/:id", (req, res) => {
    try{
        const {id} = req.params

        repositorio.destroy(id)

        res.status(204).send()
    } catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = Router