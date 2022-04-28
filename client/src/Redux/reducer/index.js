import { GET_VIDEOGAMES,
  GET_GENRE,GET_DETAIL,
  FILTER_BY_GENRES,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  GET_NAME_VIDEOGAMES,
  POST_VIDEOGAME,
  VACIAR_DETAIL,
  CLEAR_VIDEOGAMES
} from '../constantes';

const initialState = {
   videogames: [],
   genres: [],
   allVideogames: [],
   platforms: [],
   details: [],
}

function rootReducer(state= initialState, action) { 
  switch(action.type){
    case GET_VIDEOGAMES: 
      let platforms = [];

      action.payload.forEach(game => {
        platforms = [...platforms, ...game.platforms]
      });
      return {
        ...state, 
        videogames: action.payload,
        allVideogames: action.payload,
        platforms: Array.from(new Set(platforms)),

      }
    case GET_GENRE:
      return {
        ...state,
        genres: action.payload
      }
    case FILTER_BY_GENRES: 
      const allVideogames = state.allVideogames
      const filtergenre = action.payload === "All" ? allVideogames : allVideogames.filter((e) => e.genres.includes(action.payload))
      const error = [{id:1 , error: "No hay games en este genero"}]
      const verificacion = filtergenre.length !== 0 ? filtergenre : error
      return {
        ...state,
        videogames: verificacion
      }
    case FILTER_CREATED:
      const allvideogames = state.allVideogames
      const filterDB = action.payload === 'created' ? allvideogames.filter((e)=> e.createdInDb) : allvideogames.filter((e) => !e.createdInDb)
      const errorCreado = [{id:1 , error: "No hay games creados"}]
      const verificacionCreados = filterDB.length !== 0 ? filterDB : errorCreado
      return {
        ...state,
        videogames: action.payload === 'All' ? state.allVideogames : verificacionCreados
      }
    case ORDER_BY_NAME:
      const order = action.payload === 'Asc' ? state.allVideogames.sort((a , b) => {
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if(b.name.toLowerCase() > a.name.toLowerCase()) return -1;
        return 0;
      }) : state.allVideogames.sort((a , b) => {
        if(a.name.toLowerCase() > b.name.toLowerCase()) return - 1;
        if(b.name.toLowerCase() > a.name.toLowerCase()) return 1;
        return 0;
      })
      return {
        ...state,
        videogames: order
      }
    case ORDER_BY_RATING: 
    const orderRating = action.payload === 'low' ? state.allVideogames.sort((a , b) => {
      if(a.rating > b.rating) return 1;
      if(b.rating > a.rating) return -1;
      return 0;
    }) : state.allVideogames.sort((a , b) => {
      if(a.rating > b.rating) return - 1;
      if(b.rating > a.rating) return 1;
      return 0;
    })
      return {
        ...state,
        videogames: orderRating
      }
    case GET_NAME_VIDEOGAMES: 
      const errorName = [{id:1 , error: "El nombre no existe"}]
      const verificacionName = action.payload.length !== 0 ? action.payload : errorName
      return {
        ...state,
        videogames: verificacionName,
      }
    case POST_VIDEOGAME:
      return {
        ...state
      }
    case GET_DETAIL:
      return {
        ...state,
        details: action.payload
      }
    case VACIAR_DETAIL: 
      return {
        ...state,
        details:[]
      }
    case CLEAR_VIDEOGAMES:
      return {
        ...state,
        videogames:[]
      }

      default: 
        return state
  }
}

export default rootReducer