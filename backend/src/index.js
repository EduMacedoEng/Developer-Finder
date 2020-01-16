const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')

const app = express();

mongoose.connect('mongodb+srv://omnistack:7LktaG8wc2rB4HBk@cluster0-zvtsy.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json()); // Isso precisa vir antes das rotas, pois o node ler o código de forma linear (cima para baixo)
app.use(routes);

//Métodos HTTP: get (consultar), post (inserir), put (atualiar), delete (deletar)
//Tipos de parâmetros:

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Usado para PUT ou DELETE, segue dentro da rota iniciando com dois pontos)
// Body: (Usado para POST e PUT. São dados para criação ou alteração de um registro)

// MongoDB (Não-Relacional)

app.listen(3333);