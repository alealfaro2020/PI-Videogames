import React from 'react'
import { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { postVideogame , getGenre , getVideogames } from '../Redux/actions'
import style from "../css/VideoGameCreated.module.css"


function VideoGameCreated() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const genres = useSelector(state => state.genres)
  const platforms = useSelector(state => state.platforms)
  const allVideogames = useSelector((state) => state.videogames);
  const [input , setInput] = useState({
     name: "",
     image: "",
     description: "",
     released: "",
     rating: "",
     genres: [],
     platforms: [],
  });

  useEffect(() => {
    dispatch(getGenre())
    dispatch(getVideogames())
  },[dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value  //va a setearse dependiendo del target que este en ese momento. 
    });
  }

  const handleSelect = (e) => {
    setInput({
      ...input,
      genres: input.genres.includes(e.target.value) 
      ? input.genres 
      : [...input.genres, e.target.value]
    })
  }

  const handleSelect2 = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.includes(e.target.value) 
      ? input.platforms 
      : [...input.platforms, e.target.value]
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!input.name.trim()){
      return alert("Need to put name")
    }else if(
      allVideogames.find(e => 
         e.name.toLowerCase().trim() === input.name.toLowerCase().trim()
      )
    ){
      return alert(`The name ${input.name} already exist`)
    }else if (input.description.trim() === ""){
      return alert("Description required")
    }else if(input.released.trim() === ""){
      return alert("Released required")
    }else if (input.released < "1951-05-03"){
      return alert ("Date can't be below that 03/05/1951")
    }else if (input.rating === "" || input.rating < 1 || input.rating > 5){
      return alert ("Must be between 1 and 5")
    }else if (input.genres.length === 0){
      return alert ("Select one or more genres")
    }else if (input.platforms.length === 0){
      return alert ("Select one or more platforms")
  }else {
    dispatch(postVideogame(input))
    alert("Successfully created 😀")
    setInput({
      name: "",
      image: "",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: [],
    })
     navigate("/home") //redirige a la ruta que le pase. En router v6 reemplaza al hook useHistory.
  }
}   
  

  const handleDelete1 = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((el) => el !== e)
    })
  }
  const handleDelete2 = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((el) => el !== e)
    })
  }

  return (
    <div className={style.fondoVGCreate}>
      <div className={style.contenedorAll}>
      <Link to="/home">
        <button className={style.buttonBackHome} >Go back home</button>
      </Link>
      <h1 className={style.titulo}>Create your video game</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.item}>
          <label className={style.label}>Name: </label>
          <br></br>
            <input 
            className={style.input}
            type= "text"
            value= {input.name}
            name = "name"
            onChange={handleChange}
            />
        </div>
        <div className={style.item}>
          <label className={style.label}>Image: </label>
          <br></br>
            <input 
            className={style.input}
            type= "text"
            value= {input.image}
            name = "image"
            onChange={handleChange}
            />
        </div>

        <div className={style.item}>
          <label className={style.label}>Released:</label>
          <br></br>
            <input 
              className={style.input}
              type= "date"
              value= {input.released}
              name = "released"
              onChange={handleChange}
              />
        </div>

        <div className={style.item}>
          <label className={style.label}>Rating</label>
          <br></br>
            <input 
              className={style.input}
              type= "number"
              value= {input.rating}
              name = "rating"
              onChange={handleChange}
              />
        </div>

        <div className={style.item}>
          <label className={style.label}>Description</label>
          <br></br>
            <textarea 
              className={style.inputDescription}
              type= "text"
              value= {input.description}
              name = "description"
              onChange={handleChange}
              />
        </div>

        <div className={style.item}>
          <label className={style.label}>Genres</label>
          <br></br>
          <select 
            className={style.select}
            defaultValue="select"
            onChange = {handleSelect}
            >
            <option className={style.select} disabled>Select</option>
            {
              genres?.map((e) => {
                return (
                <option className={style.select} value={e.name} key={e.id}>{e.name}</option>
                )})
            }
            </select>
            
            <ul className="ul">
                {input.genres.map((e) => (
                  <li key={e} className={style.listaGP}>
                    <div className={style.divGP}>
                      {e + " "}
                      <button className={style.buttonx} type='button' onClick={() => handleDelete1(e)}>
                        X
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
        </div>  

        <div className={style.item}>
          <label className={style.label}>Platforms</label>
            <br></br>
              <select 
                className={style.select}
                defaultValue="platforms"
                onChange = {handleSelect2}
                >
                <option className={style.select} disabled>Platforms</option>
                {
                  platforms?.map((e) => {
                    return (
                    <option className={style.select} value={e} key={e}>{e}</option>
                    )})
                }
            </select>
            <ul className="ul">
                {input.platforms.map((e) => (
                  <li key={e} className={style.listaGP}>
                    <div className={style.divGP}>
                      {e + " "}
                      <button className={style.buttonx} type='button' onClick={() => handleDelete2(e)}>
                        X
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
        </div>  
        <br></br>
        <button className={style.buttonCreate} type='submit'>Create videogame</button>
      </form>
    </div>
  </div>
  )
}

export default VideoGameCreated