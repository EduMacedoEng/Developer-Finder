//Desenvolverdor é uma entidade dentro do banco de dados e para cada entidade eu terei um arquivo.
const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

//Esse padrão é a estruturação de um Schema dentro do BD. Isso é padrão, irá sempre se repetir na criação de um model.
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], //Aqui automaticamente ele vai entender que eu quero um vetor de strins (várias tecnologias)
    location: {
        type: PointSchema,
        //O indice que colocamos para um ponto de latitude e longitude é o que segue abaixo
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Dev', DevSchema)