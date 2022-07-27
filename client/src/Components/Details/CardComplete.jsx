import React from 'react'
import { Link } from 'react-router-dom'
import s from './CardDetail.module.css'
import Corazon from '../imagenes/corazon.png'
import Escudo from '../imagenes/escudo.png'
import Espada from '../imagenes/espada.png'
import Rayo from '../imagenes/rayo.png'
import Balanza from '../imagenes/balanza.png'
import Altura from '../imagenes/altura.png'






export default function CardComplete({name,img,health,attack,defense,speed,height,weight,types}){
    return (
        <div className={s.contenedor}>
            <h1 className={s.name}>{name}</h1>
            <img src={img} alt={name} className={s.pokemon}/>
            <div className={s.card}>
                <p className={s.texto}><img src={Corazon} alt='asd' className={s.corazon}/> {health}</p>
                <p className={s.texto}><img src={Rayo} alt='asd' className={s.corazon}/> {speed}</p>
                <p className={s.texto}><img src={Escudo} alt='asd' className={s.corazon}/> {defense}</p>
                <p className={s.texto}><img src={Espada} alt='asd' className={s.corazon}/> {attack}</p>
                <p className={s.texto}><img src={Altura} alt='asd' className={s.corazon}/> {height} cm</p>
                <p className={s.texto}><img src={Balanza} alt='asd' className={s.corazon}/> {weight} kg</p>
                <p className={s.types}>Types : {types.join(' ')}</p>
            </div>
            <Link to={'/home'}>
                <button className={s.btn}>Volver</button>
            </Link>
        </div>)
}