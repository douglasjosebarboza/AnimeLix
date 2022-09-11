import express from 'express'
const app = express()
const port = 8080

app.use(express.static("./src"))
console.log()

app.listen(port, () => console.log("Conectado na porta: " + port))