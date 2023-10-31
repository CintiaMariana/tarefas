const validar = (dados) => {
   const {status} = dados

   if(status){
    const statusPermitido = ["FEITO", "A FAZER", "FAZENDO"]
    if(!statusPermitido.includes(status.toUpperCase())){
        return false
    }
    
   }

   return true
}

module.exports = validar