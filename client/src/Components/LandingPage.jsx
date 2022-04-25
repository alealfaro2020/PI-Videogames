import React from 'react'
import { Link } from 'react-router-dom'
import style from '../css/LandingPage.module.css'


function LandingPage() {
  return (
    <div className={style.LandingPage}>
        <h1 className={style.titulo}>Welcome to PolloGames</h1>
        {/* <img src='https://cdn.discordapp.com/attachments/472820127797084213/968006901440864296/gamepad-6233583_1920-removebg-preview.png'/> */}
        <Link to='/home'>
            <button className={style.buttonIngresar}>GET STARTED</button>
        </Link>
    </div>
  )
}

export default LandingPage