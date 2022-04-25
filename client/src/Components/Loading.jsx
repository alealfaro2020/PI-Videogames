import React from 'react'
import style from '../css/Loading.module.css'
import gifLoading from '../css/256x256.gif'

function Loading() {

  return (
    <div className={style.contenedorLoading}>
        <img src={gifLoading}
        alt="Loading please wait"
        
        />
    </div>
  )
}

export default Loading