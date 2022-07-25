import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName} from "../Redux/Actions";


export default function Search(){
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const searchName = (e) => {
        e.preventDefault()
        dispatch(getPokemonByName(search))
        
    }

    return (
        <div>
            <form  onSubmit={searchName}>
                <input type="text" name="search" value={search} onChange={handleSearch} />
                <button type="submit" name="boton">Search</button>
            </form>
            
        </div>)
}