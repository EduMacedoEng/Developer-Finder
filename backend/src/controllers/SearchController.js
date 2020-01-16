const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(req, res) {
        const { latitude, longitude, techs } = req.query;
        // Buscar todos os devs em um raio de 10 km
        // Filtrar por tecnologias
        const techsArray = parseStringAsArray(techs);
        console.log(techsArray)

        const devs = await Dev.find({
            techs: {
                // Esse $in é um operador lógico dentro do MongoDB
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, // 10000 metros = 10 kilometros
                }
            }
        })

        //return res.json({ devs: [] });
        return res.json({ devs });
    }
}