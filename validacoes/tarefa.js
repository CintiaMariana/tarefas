const validar = (dados) => {
   const {nome, descricao, status} = dados

   if (nome && descricao && status){
    const statusPermitido = ["FEITO", "A FAZER", "FAZENDO"]
    return statusPermitido.includes(status.toUpperCase())
   }

    return false
}

module.exports = validar