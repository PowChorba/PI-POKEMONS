import React, { useEffect } from "react";
import Nav from '../Nav/index.jsx'
import { useDispatch, useSelector } from 'react-redux';
import {filterByAttack, filterByCreaction, getPokemons, searchByType, sortByName} from '../Redux/Actions/index.js'
import PokemonCard from "../PokemonCard/index.jsx";
import Gif from '../imagenes/pokeball.gif'
import Search from "../Extras/Search.jsx";
import { useState } from "react";
import SiluetaCreate from '../imagenes/picachu.jpg'
import s from './Home.module.css'


export default function Home() {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.filter)
    
    //PARA MANEJAR EL PAGINADO
    const paginas = Math.ceil(pokemons.length / 12)
    const [page, setPage] = useState(1)
    const pokemonsPerPage = 12
    const ultima = page * pokemonsPerPage
    const primera = ultima - pokemonsPerPage
    const pokemonsFiltrados = pokemons.slice(primera, ultima)
    console.log(pokemons)
    //PAGINADO
    const handlePrev = () => {
        setPage(page - 1)
        if(page < 2){
            setPage(1)
        }
        window.scrollTo(0,0)
    }

    const handleNext = () => {
        setPage(page + 1)
        if(page >= paginas){
            setPage(paginas)
        }
        window.scrollTo(0,0)
    }

    //PARA TRAER LA DATA DE LA BASE DE DATOS
    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    
    // FILTER TYPES
    const handleTypes = (e) => {
        e.preventDefault()
        dispatch(searchByType(e.target.value))
        setPage(1)
        
    }

    // SORT NAME
    const handleSortName = (e) => {
        e.preventDefault()
        dispatch(sortByName(e.target.value))
        setPage(1)
        
    }

    //FILTER BY CREATION
    const handleByCreation = (e) => {
        e.preventDefault()
        dispatch(filterByCreaction(e.target.value))
        setPage(1)
        
    }

    //FILTER BY ATTACK
    const handleAttack = (e) => {
        e.preventDefault()
        dispatch(filterByAttack(e.target.value))
        setPage(1)
        
    }


    return (
        <div>
            <div>
                <Nav/>
            </div>
            <div className={s.contenedor}>
                <div className={s.filtrados}>
                <div>
                    <select onChange={e => handleByCreation(e)}>
                        <option value="allpokemons">All Pokemons</option>
                        <option value="apipokemons">Api Pokemons</option>
                        <option value="userpokemons">Created By Users</option>
                    </select>
                </div>
                <div>
                    <select onChange={e => handleSortName(e)}>
                        <option>Sort Name</option>
                        <option value="ascendente">A - Z</option>
                        <option value="descendente">Z - A</option>
                    </select>
                </div>
                <div>
                <Search
                page={page}
                setPage={setPage}
                />
                </div>
                <div>
                    <select onChange={(e) => handleAttack(e)}>
                        <option>Sort by Attack</option>
                        <option value="ascendente">Stronger</option>
                        <option value="descendente">Weaker</option>
                    </select>
                </div>
                <div>
                    <select onChange={e => handleTypes(e)}>
                        <option>Types</option>
                        <option value="normal">Normal</option>
                        <option value="fighting">Fighting</option>
                        <option value="flying">Flying</option>
                        <option value="poison">Poison</option>
                        <option value="ground">Ground</option>
                        <option value="rock">Rock</option>
                        <option value="bug">Bug</option>
                        <option value="ghost">Ghost</option>
                        <option value="steel">Steel</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="psychic">Psychic</option>
                        <option value="ice">Ice</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Dark</option>
                        <option value="fairy">Fairy</option>
                        <option value="unknown">Unknown</option>
                        <option value="shadow">Shadow</option>
                    </select>
                </div>
                </div>
                <h1 className={s.titulo}>Home</h1>
                <div className={s.cards}>
                    {
                        typeof (pokemonsFiltrados) === 'object' && pokemonsFiltrados.map( e => {
                            return <PokemonCard
                            key={e.id}
                            name={e.name}
                            types={e.types}
                            img={e.img ? e.img : SiluetaCreate}
                            id={e.id}
                            />

                            }
                        )
                    }
                <div className={s.precargar}>{pokemonsFiltrados.length === 0 && <img className={s.precargar} src={Gif} alt='asd'/>}asd</div>
                <div className={pokemonsFiltrados.length === 0 ? s.paginado2 : s.paginado}>
                    <button onClick={handlePrev}>Prev</button>
                    <p>{page} of {paginas}</p>
                    <button onClick={handleNext}>Next</button>
                </div> 
            </div>   
            </div>
        </div>)
}