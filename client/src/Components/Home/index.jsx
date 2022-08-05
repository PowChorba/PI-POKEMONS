import React, { useEffect } from "react";
import Nav from '../Nav/index.jsx'
import { useDispatch, useSelector } from 'react-redux';
import {filterByAttack, filterByCreaction, getPokemons, searchByType, sortByName} from '../Redux/Actions/index.js'
import PokemonCard from "../PokemonCard/index.jsx";
import Gif from '../imagenes/pokeball.gif'
import Search from "../Extras/Search.jsx";
import { useState } from "react";
import SiluetaCreate from '../imagenes/picachu.png'
import s from './Home.module.css'


export default function Home() {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.filter)
    
    //PARA MANEJAR EL PAGINADO
    const paginas = Math.ceil(pokemons.length / 6) 
    const [page, setPage] = useState(1)
    const [pokemonsPerPage] = useState(6)
    const ultima = page * pokemonsPerPage
    const primera = ultima - pokemonsPerPage
    const pokemonsFiltrados = pokemons.slice(primera, ultima)
    
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

    const handleFinal = (e) => {
        setPage(paginas)
        window.scrollTo(0,0)
    }
    const handleInicio = () => {
        if(page === paginas){
            setPage(1)
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
    // altura mayor a 15, attack 60 - 120.
    // const handlePrueba = (e) => {
    //     e.preventDefault()
    //     dispatch(boton())
    // }
    
    return (
        <div className={pokemons.length === 0 ? s.carga : s}>
            <div>
                <Nav/>
            </div>

            <div className={pokemonsFiltrados.length > 1 ? s.contenedor : s.contenedor2}>
            
            <h1 className={s.titulo}>Home</h1>
                <div className={s.filtrados}>
                <div>
                    <select onChange={e => handleByCreation(e)} className={s.sortDB} disabled={pokemons.length ? false : true}>
                        <option value="allpokemons">All Pokemons</option>
                        <option value="apipokemons">Api Pokemons</option>
                        <option value="userpokemons">Created By Users</option>
                    </select>
                </div>
                <div>
                    <select onChange={e => handleSortName(e)} className={s.sortDB} disabled={pokemons.length ? false : true}>
                        <option>Sort Name</option>
                        <option value="ascendente">A - Z</option>
                        <option value="descendente">Z - A</option>
                    </select>
                </div>
                {/* <div>
                    <button onClick={handlePrueba}>Boton</button>
                </div> */}
                <div className={s.search}>
                <Search
                setPage={setPage}
                
                />
                </div>
                <div>
                    <select onChange={(e) => handleAttack(e)} className={s.sortDB} disabled={pokemons.length ? false : true}>
                        <option>Sort by Attack</option>
                        <option value="ascendente">Stronger</option>
                        <option value="descendente">Weaker</option>
                    </select>
                </div>
                <div>
                    <select onChange={e => handleTypes(e)} className={s.sortDB} disabled={pokemons.length ? false : true}>
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
                
                <div className={s.cards}>
                    {
                        pokemons[0] === 'Vacio' ? <div className={s.falseDiv}><p className={s.false}>We couldn`t find Pokemon`s in DataBase</p></div> 
                        : 
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
                {pokemonsFiltrados.length === 0 && <div className={s.div}><img src={Gif}  className={s.precargar} alt='asd'/></div>}
                </div>
                <div>
                    {
                        pokemons === 'We couldn`t find a Pokemon with that name' && <div className={s.falseDiv}><p className={s.false}>We couldn`t find a Pokemon with that name</p></div>
                    }
                </div>
                <div className={pokemonsFiltrados.length === 0 ? s.paginado2 : s.paginado}>
                    <button onClick={handlePrev} className={page === 1 ? s.ocultobtn : s.paginadobtn}>Prev</button>
                    
                    {/* <p className={s.numeros}>{page} of {paginas}</p> */}
                    <span className={s.numeros}>{page} of </span>
                    <button onClick={handleFinal} className={s.paginas}>{paginas}</button>
                    
                    {/* <button onClick={handleNext} className={page === paginas ? s.ocultobtn : s.paginadobtn}>Next</button>
                    <button onClick={volver} className={page !== paginas ? s.ocultobtn : s.paginadobtn}>Back</button> */}
                    {
                        page === paginas 
                        ? <button onClick={handleInicio} className={page !== paginas ? s.ocultobtn : s.paginadobtn}>Back</button>
                        : <button onClick={handleNext} className={page === paginas ? s.ocultobtn : s.paginadobtn}>Next</button>
                    }
                </div> 
            </div>
        </div>)
}