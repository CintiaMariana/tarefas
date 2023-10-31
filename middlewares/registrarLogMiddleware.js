const fs = require("fs")

const registrarLogMiddleware = (req, res, next) => {
    const log_path = process.env.log_path

    const dateTime = new Date()
    const endpoint = req.originaURL
    
    const log = `${dateTime} - ${endpoint}\n`

    fs.appendFile(`${log_path}/acessos.log`, log, () => {})

    next()
}

module.exports = registrarLogMiddleware