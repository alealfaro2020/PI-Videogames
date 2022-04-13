const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const router = Router();
const { getAllVideogames } = require('../controllers/videogames')


router.get('/:id', async (req , res) => {
    const { id } = req.params
    const allGames = await getAllVideogames()
    if(id){
        let videogameId = await allGames.filter((e) => e.id == id)
        videogameId.length ? res.status(200).json(videogameId) : res.status(400).send('No se encontro el videogame')
    }
})

router.post('/', async (req , res) => {
    const {   // lo que reciben por body osea por formulario. 
        name,
        image,
        genres,
        description,
        released,
        rating,
        platforms,
        createdInDb,
    } = req.body

    const createVideoGame = await Videogame.create({ //creo el personaje desde la base db
        name,
        image,
        description,
        released,
        rating,
        platforms,
        createdInDb
    })
    const searchGenre = await Genre.findAll({ //me traigo los generos y luego comparo por nombre. El correcto lo agrego abajo con el "AddGenre()"
        where: {name: genres},
    });
    createVideoGame.addGenre(searchGenre)
    res.send("Videogame created successfully")
})

module.exports = router;