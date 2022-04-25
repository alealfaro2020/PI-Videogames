import React from 'react'
import { useState } from 'react'
import { getNameVideogames } from '../Redux/actions/index'
import { useDispatch } from 'react-redux'
import style from "../css/SerchBar.module.css"


function SerchBar() {
  const [input , setInput] = useState('')
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const re = /^[0-9a-zA-ZÁ-ÿ.:-\s]{0,40}$/;


  const handleInputChange = (e) => {
    e.preventDefault()
    setInput(e.target.value)
    if(!re.exec(e.target.value)){
      e.target.value.length > 40 ? setErrors({
        name: "invalid length"
      })
      :  setErrors({
        name: "invalid character"
      })
    }else {
      setErrors({
        name: ""
      })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(input === ""){
      setErrors({
        name: "this field is required"
      })
    }else {
      dispatch(getNameVideogames(input))
      setInput("")
    }
  }
  

  return (
    <div className={style.searchbar}>
      <form onSubmit={handleSubmit} >
        <div>
        <input className={style.input} 
        name="name"
        type="text"
        placeholder = "Buscar videogame..."
        value={input}
        onChange = {handleInputChange}
        />
        {errors.name && (
        <div className={style.errors}>
        <p>{errors.name}</p>
        </div>
       )}
        <button className= {style.button} type='submit'>SEARCH</button>
        </div>
      
      </form>
    </div>
  )
}

export default SerchBar