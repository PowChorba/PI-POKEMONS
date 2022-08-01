import React from 'react';
import {Route} from 'react-router-dom'
import Home from './Components/Home/index.jsx';
import Welcome from './Components/PaginaInicial/index.jsx'
import Details from './Components/Details/PokemonDetail.jsx';
import CreatePokemon from './Components/Formulario/Formulario.jsx';
import s from './App.module.css'
import dotenv from 'dotenv'
import axios from 'axios';
dotenv.config()

axios.defaults.baseURL= process.env.REACT_APP_API || 'http://localhost:3001'

function App() {
  return (
    <div className={s.contenedor}>
      <React.Fragment>
        <Route exact path='/' component={Welcome} className={s.asd}/>
        <Route exact path='/home' component={Home}/>
        <Route path='/home/:id' component={Details}/>
        <Route exact path='/create' component={CreatePokemon}/>
      </React.Fragment>
    </div>
  );
}

export default App;
