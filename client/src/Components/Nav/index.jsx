import React from "react";
import pokeball from '../imagenes/pokeball-nav.png'
import s from './index.module.css'
import {Link} from 'react-router-dom'

export default function Nav(){
    return(
        <div>
            <Link to='/home'>
                <h3>PokemonsAPI</h3>
            </Link>
            <img src={pokeball} alt="Aca iria una pokeball" className={s.pokeball}/>
            <div>
                <p>Home</p>
                <Link to='/create'>
                    <p>Create</p>
                </Link>
            </div>
        </div>)
}