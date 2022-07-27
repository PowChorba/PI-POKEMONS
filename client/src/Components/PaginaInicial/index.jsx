import React from 'react';
import { Link } from 'react-router-dom';
import s from './Inicial.module.css'
// import poke from '../imagenes/inicial.png'
import poke from '../imagenes/descarga.png'

export default function Welcome () {
    return(
        <div className={s.contenedor}>
            
            <Link to='/home'>
                <img src={poke} alt="asd" className={s.asd}/>
            </Link>
        </div>)
}