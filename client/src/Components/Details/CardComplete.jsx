import React from 'react'
import { Link } from 'react-router-dom'

export default function CardComplete({name,img,health,attack,defense,speed,height,weight,types}){
    return (
        <div>
            <h1>{name}</h1>
            <img src={img} alt={name} />
            <p>Health: {health}</p>
            <p>Attack: {attack}</p>
            <p>Defense: {defense}</p>
            <p>Speed: {speed}</p>
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
            <p>Types : {types}</p>
            <Link to={'/home'}>
                <button>Volver</button>
            </Link>
        </div>)
}