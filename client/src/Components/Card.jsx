import React from 'react'
import style from "../css/Card.module.css"

function Card({name,image,genres,rating}) {
  return (
    <div className={style.cardItem}>
        <div className= {style.card}>
        <h1 className= {style.nombre}>{name}</h1>
        <img className={style.imagen} src={image} alt='Img not found' />
        <h2 className={style.generos}>Genres: {genres.join(",  ")}</h2>
        <h2 className={style.rating}>Rating: {rating}</h2>
      </div>
    </div>
  )
}

export default Card