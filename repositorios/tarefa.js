let tarefas = [
    {
        nome: "Tarefa 1",
        descricao: "Descrição da Tarefa 1",
        status: "A FAZER",
        id: 1
    },

    {
        nome: "Tarefa 2",
        descricao: "Descrição da Tarefa 2",
        status: "FEITO",
        id: 2

    }
]

let ultimo_id = 2

const validacao = require("../validacoes/tarefa")

const tarefaRepositorio = () => {
    return {
        getAll: () => {
            
            return tarefas
        },

        get: (id) => {
            const tarefasFiltradas = tarefas.filter(t => t.id == id)

            if(tarefasFiltradas.length == 0){
                throw new Error(JSON.stringify({
                    status: 404,
                    msg:"Tarefa não encontrada"
                }))
            } else {
                return tarefasFiltradas[0]
            }
        },
        create: (dados) => {
            if(validacao(dados)){
                dados.id = ++ultimo_id

                tarefas.push(dados)

                return dados
            } else {
                throw new Error("Dados inválidos para cadastrar")
            }
        },

        update: (id, dados) => {
            const tarefaIndex = tarefas.findIndex(t => t.id == id)

            if (tarefaIndex == -1){
                throw new Error("Tarefa não encontrada")
            }

            if (validacao(dados)){
                tarefas[tarefaIndex] = {...tarefas[tarefaIndex], ...dados}
                return tarefas[tarefaIndex]
            } else {
                throw new Error("Dados inválidos para atualizar")
            }
        },

        patch: (id, dados) => {
            const tarefaIndex = tarefas.findIndex(t => t.id == id)

            if (tarefaIndex === -1){
                throw new Error("Tarefa não encontrada")
            }

            if (validacao(dados)){
                tarefas[tarefaIndex] = {...tarefas[tarefaIndex], ...dados}
                return tarefas[tarefaIndex]
            } else {
                throw new Error("Dados inválidos para atualizar parcialmente")
            }

        },

        destroy: (id) => {
            const tarefasFiltradas = tarefas.filter(tarefa => tarefa.id == id)

            if (tarefasFiltradas.length == 0){
                throw new Error("Tarefa Inexistente")
            }

            tarefas = tarefas.filter(tarefa => tarefa.id != id)

            return true
        }
    }
}

module.exports = {
    tarefaRepositorio
};
