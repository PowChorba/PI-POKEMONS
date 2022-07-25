import React from 'react';
import { Link } from 'react-router-dom';

export default function PokemonCard({id,name,types, img}){
    
    return (
        <div>
            
            <h3 key={id}>{name}</h3>
            <img src={img} alt='name'/>
            <p>{types}</p>
            <Link to={`/home/${id}`}>
                <button>Details</button>
            </Link>
        </div>)
}