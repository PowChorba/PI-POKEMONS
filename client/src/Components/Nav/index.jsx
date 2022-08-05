import React, {useState} from "react";
import pokeball from '../imagenes/nav.png'
import s from './index.module.css'
import {NavLink} from 'react-router-dom'
import { FaBars } from 'react-icons/fa';

export default function Nav(){
    const [nav, setNav] = useState(false)
    const handleOnClick = () => {
        setNav(!nav)
    }
    
    return(
        <div>
            <div className={s.responsive}>
            <FaBars className={s.bars} onClick={handleOnClick} value={nav}/>
            <h3 className={s.tituloR}>PokeDex</h3>
            </div>
            <div className={ nav ? s.nav2 : s.nav}>
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
            </div>
            
        </div>)
}