var express = require('express')
var app = express()
var port = 8081

app.use(express.static(__dirname + '/src'))

app.listen(port, () => {console.log(`Conectado na porta ${port}`)})