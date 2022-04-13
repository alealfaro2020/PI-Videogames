
const { Videogame, Genre } = require("../db");
const { APY_KEY } = process.env;
const axios = require("axios");


const getApiInfo = async () => {
    try {
      const arrVideogames = [];
      let apiUrl = `https://api.rawg.io/api/games?key=${APY_KEY}`;
  
      for (let i = 0; i < 5; i++) {
        let pages = await axios.get(apiUrl);
        pages.data.results?.map((e) => {
          arrVideogames.push({
            id: e.id,
            name: e.name,
            image: e.background_image,
            genres: e.genres?.map((el) => el.name), //
            released: e.released,
            rating: e.rating,
            platforms: e.platforms?.map((el) => el.platform.name),
          });
        });
        apiUrl = pages.data.next;
      }
      return arrVideogames;
    } catch (error) {
      console.log(error);
    }
  };


const getDbInfo = async () => { //info de la base de datos.
    const infoDb = await Videogame.findAll({
        include:{          // usamos el include de sequelize para relacionar los modelos. Si no lo uso, no me traeria los videojuegos con los generos. 
            model: Genre,
        }
    })
    const mapInfoDb = infoDb?.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image,
            genres: e.genres?.map((e) => e.name),
            description: e.description,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms?.map((el) => el),
            createdInDb: e.createdInDb,
        };
    });
    return mapInfoDb;
};

const getAllVideogames = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;
}


module.exports = {
    getApiInfo,
    getDbInfo,
    getAllVideogames,
}