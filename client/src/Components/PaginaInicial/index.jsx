import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome () {
    return(
        <div>
            <h1>Welcome to PokemonsAPI</h1>
            <Link to='/home'>
                <button>Enter to Home</button>
            </Link>
        </div>)
}