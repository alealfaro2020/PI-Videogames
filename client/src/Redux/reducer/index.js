import { GET_VIDEOGAMES,
  GET_GENRE,GET_DETAIL,
  FILTER_BY_GENRES,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  GET_NAME_VIDEOGAMES,
  POST_VIDEOGAME,
  VACIAR_DETAIL
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
        flagLoad: false,
      }
    case GET_GENRE:
      return {
        ...state,
        genres: action.payload
      }
    case FILTER_BY_GENRES: 
      const allVideogames = state.allVideogames
      const filtergenre = action.payload === "All" ? allVideogames : allVideogames.filter((e) => e.genres.includes(action.payload))
      return {
        ...state,
        videogames: filtergenre
      }
    case FILTER_CREATED:
      const allvideogames = state.allVideogames
      const filterDB = action.payload === 'created' ? allvideogames.filter((e)=> e.createdInDb) : allvideogames.filter((e) => !e.createdInDb)
      return {
        ...state,
        videogames: action.payload === 'All' ? state.allVideogames : filterDB
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
      return {
        ...state,
        videogames: action.payload,
        flagLoad: false,
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

      default: 
        return state
  }
}

export default rootReducer