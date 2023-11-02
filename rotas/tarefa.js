
const {tarefaRepositorio} = require('../repositorios/tarefa')
const repositorio = tarefaRepositorio()

const Router = require('express').Router()

Router.get("/tarefa",(req, res) => {
    // #swagger.tags = ['Tarefas']
    // #swagger.description = 'Busca de todas as tarefas'
    /* #swagger.responses[200] = {
        description: 'Retorno com sucesso, devolve todos os dados dos usuários.',
        schema: [
            {
                nome: 'Nome da Tarefa',
                descricao: 'Descrição da Tarefa',
                status: 'Status da Tarefa'
            }
        ]
    }
        #swagger.responses[404] = {
            description: 'Quando não existem nenhum dado'
        }
        #swagger.responses[400] = {
            description:'Quando o usuário envia dados de forma incorreta.',
        }
        #swagger.responses[500] = {
            description: 'Erro interno do servidor'
        }
    */    
    try{
        
        const tarefas = repositorio.getAll()
        res.send(tarefas)
    } catch(err){
        console.error(err)
        res.status(500).send("Erro ao buscas as tarefas")
    }
})

Router.get("/tarefa/:id", (req, res) => {
     // #swagger.tags = ['Tarefas']
    // #swagger.description = 'Busca de tarefas através da ID'
    /* #swagger.responses[200] = {
        description: 'Retorno com sucesso, devolve os dados da Tarefa solicitada.',
        schema: [
            {
                nome: 'Nome da Tarefa',
                descricao: 'Descrição da Tarefa',
                status: 'Status da Tarefa'
            }
        ]
    }
        #swagger.responses[404] = {
            description: 'Quando não existem nenhum dado'
        }
        #swagger.responses[400] = {
            description:'Quando o usuário envia dados de forma incorreta.',
        }
    */
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
   /*
       #swagger.tags = ['Tarefas']
       #swagger.desciption = 'Criação de uma nova tarefa'
       #swagger.parameters['tarefa'] = {
        in: 'body',
        description: 'Dados enviados para cadastrar a tarefa',
        required: true,
        schema: {
            nome: 'Nome da tarefa',
            descricao: 'Descrição da tarefa',
            status: 'Status da tarefa'
        }
       }
       #swagger.responses[201] = {
        description: 'Tarefa criada com sucesso'
       }
       #swagger.responses[400] = {
        description: 'Dados incorretos para criação da tarefa'
       }
   */
    try{
        const dados = req.body

        const tarefaCriada = repositorio.create(dados)

        res.send(tarefaCriada)
    }catch(err){
        res.status(400).send(err.message)
    }
})

Router.put("/tarefa/:id", (req, res) => {
    /*  
       #swagger.tags = ['Tarefas']
       #swagger.description = 'Atualiza uma tarefa existente pelo ID'
       #swagger.parameters['id] = {
        in: 'path',
        description: 'ID da tarefa atualizada',
        required: true,
        type: 'integer'
       }
       #swagger.parameters['tarefa']= {
        in: 'body',
        description: 'Dados enviados para atualizar a tarefa',
        required: true,
        schema: {
            nome: 'Nome da Tarefa',
            descricao: 'Descrição da Tarefa',
            status: 'Status da Tarefa (exemplo: FEITO)'
        }
       }
       #swagger.responses[200] = {
        description: 'Tarefa atualizada com sucesso'
       }
       #swagger.responses[400] = {
        description: 'Erro na soliticação de atualização'
       }
       #swagger.responses[404] = {
        description: 'Tarefa não encontrada para atualizar'
       }
    */
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
    /*  
       #swagger.tags = ['Tarefas']
       #swagger.description = 'Atualiza parcialamente uma tarefa existente pelo ID'
       #swagger.parameters['id] = {
        in: 'path',
        description: 'ID da tarefa atualizada',
        required: true,
        type: 'integer'
       }
       #swagger.parameters['tarefa']= {
        in: 'body',
        description: 'Dados enviados para atualizar a tarefa',
        required: true,
        schema: {
            nome: 'Nome da Tarefa',
            descricao: 'Descrição da Tarefa',
            status: 'Status da Tarefa (exemplo: FEITO)'
        }
       }
       #swagger.responses[200] = {
        description: 'Tarefa atualizada com sucesso'
       }
       #swagger.responses[400] = {
        description: 'Erro na soliticação de atualização'
       }
       #swagger.responses[404] = {
        description: 'Tarefa não encontrada para atualizar'
       }
    */
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
    // #swagger.tags = ['Tarefas']
    // #swagger.description = 'Delete uma Tarefa utilizando sua ID'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID da tarefa a ser deletada',
        required: true,
        type: 'integer'
    } 
       #swagger.responses[204] = {
        description: 'Tarefa deletada com sucesso'
        }
       #swagger.responses[400] = {
        description: 'Erro na solicitação',
       }
        */
    try{
        const {id} = req.params

        repositorio.destroy(id)

        res.status(204).send()
    } catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = Router