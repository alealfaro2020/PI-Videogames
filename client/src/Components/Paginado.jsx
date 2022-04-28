import React from 'react'
// import { Link } from 'react-router-dom'
import style from '../css/Paginado.module.css'

function Paginado({videoGamePerPage,allVideoGames, paginado,currentPage}) {
  let pageNumbers = [];
  let Paginas = Math.ceil(allVideoGames/videoGamePerPage)


  for(let i = 1 ; i <= Paginas; i++){  //math.ceil redondea para arriba.
    pageNumbers.push(i)
  }
 
  return (
    <nav>
      <ul className={style.ul}>
      {
        currentPage - 1 > 0 ? (
          <button className={style.buttonPN} onClick={() => paginado(currentPage - 1)} >Prev</button>
        )
        : null
      }
      { 
        pageNumbers && pageNumbers.map(number => (
          <li className={style.li} key={number}>
            <button className={style.botonPaginado} onClick={() => paginado(number)}>{number}</button>
          </li>
        ))
      }
      {
        currentPage < Paginas ? (
          <button className={style.buttonPN} onClick={() => paginado(currentPage + 1)} >Next</button>
        )
        : null
      }
      </ul>
    </nav>
  )
}

export default Paginado