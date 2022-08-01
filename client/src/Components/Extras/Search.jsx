import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName} from "../Redux/Actions";
import s from './Search.module.css'

export default function Search({setPage}){
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    
    const searchName = (e) => {
        e.preventDefault()
        dispatch(getPokemonByName(search))
        setPage(1)
        
    }
    
    return (
        <div className={s.contenedor}>
            <form  onSubmit={searchName}>
                <input type="text" name="search" value={search} onChange={handleSearch} className={s.input} placeholder='Search your Pokemon'/>
                <button type="submit" name="boton" className={s.btn}>Search</button>
            </form>
            
        </div>)
}