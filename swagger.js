const autogen = require("swagger-autogen")()

const fileDocs = './swaggerOutput.json'

const routeFiles = './rotas/tarefa.js'

const infos = {
    info: {
        title: "API de tarefas",
        description: "API criada durante o curso de Sistemas de Informações",
        version: "2.0.0"
    },
    host:'localhost:3000',
    schemes: ['http', 'https']
}

autogen(fileDocs, routeFiles, infos).then(()=> {
    require("./index.js")
})