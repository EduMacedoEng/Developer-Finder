const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

// A controller tem no máximo 5 functions
// index (mostrar varios), show (mostrar apenas um), store (criar), update (atualizar), destroy (deletar)

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            //usando o async/await ele irá esperar a resposta da chamada API do GitHub para continuar o código.
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            //no caso do name eu estou dizendo que caso não haja a variavel name eu pego a variavel login.
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
            console.log(name, avatar_url, bio, github_username);
        }
        //return res.json({ message: 'Hellow Omni10 !' });
        return res.json(dev)
    },

    //Atualizar o nome, o avatar, a bio, o localizador e as techs
    async update() {

    },

    async destroy() {

    }
}