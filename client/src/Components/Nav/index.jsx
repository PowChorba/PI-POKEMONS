import React from "react";
import pokeball from '../imagenes/nav.png'
import s from './index.module.css'
import {NavLink} from 'react-router-dom'

export default function Nav(){
    return(
        <div className={s.nav}>
            <h3 className={s.titulo}>PokeDex</h3>
            <img src={pokeball} alt="Aca iria una pokeball" className={s.pokeball}/>
            <ul className={s.ul}>
                <li className={s.lista}>
                    <NavLink to='/home' activeClassName={s.asd} className={s.link}>
                        <p>Home</p>
                    </NavLink>
                </li>
                <li className={s.lista}>
                    <NavLink to='/create' activeClassName={s.asd}   className={s.link}>
                        <p>Create</p>
                    </NavLink>
                </li>
            </ul>
            
        </div>)
}