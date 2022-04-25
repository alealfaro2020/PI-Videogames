import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDetail , vaciarDetail } from '../Redux/actions'
import style from "../css/Detail.module.css"

function Detail() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const myVideogame = useSelector(state => state.details)

  useEffect(() => {
    dispatch(getDetail(id))
    return function () {
      dispatch(vaciarDetail())
    }
  },[dispatch, id])
  console.log(myVideogame)

  return (
    <div className= {style.fondoDetail}>
      { myVideogame ? (
        <div className= {style.contenedorGeneral}>
          <h1 className= {style.tituloName}>{myVideogame.name}</h1>
          <img className= {style.image} src={myVideogame.image} alt=""/>
          <div className= {style.contenedorSecundario}>
            <h4 className= {style.items}>🏆Rating: {myVideogame.rating} </h4>
            <h4 className= {style.items}>Released: {myVideogame.released}</h4>
            <h4 className= {style.items}>Platform: {myVideogame.platforms}</h4>
            <h4 className= {style.items}>
              Genres: 
              {myVideogame.genres?.map((g) => g.name).join(", ")}
            </h4>
            <h4 className= {style.items}>Description: </h4>
            <p 
            className={style.descriptionDetail}
            dangerouslySetInnerHTML = {{__html: myVideogame.description }}/>
          </div>
          <Link to="/home">
          <button className= {style.buttonBack}>Go Home</button>
          </Link>
        </div>
      ): null}
    </div>
  )
}

export default Detail