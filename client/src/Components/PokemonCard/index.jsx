import React from 'react';
import { Link } from 'react-router-dom';
import s from './PokemonCard.module.css'


export default function PokemonCard({id,name,types, img}){
    
    return (
        <div className={s.contenedor}>
            
            <h3 key={id} className={s.name}>{name}</h3>
            <img src={img} alt='name' className={s.imagen}/>
            {/* <div>
            {
                types.map(e => {
                    return <p>{e.types}</p>
                    
                })
            }
            </div> */}
            <p className={s.types}>{types.join(' ')}</p>
            <Link to={`/home/${id}`}>
                <button>Details</button>
            </Link>
        </div>)
}