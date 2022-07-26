import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createPokemon, getTypes } from "../Redux/Actions";
import Nav from '../Nav/index.jsx'
import Silueta from '../imagenes/picachu.jpg'


function validate(input) {
    let error = {};
    // const imagen = /[(http(s)?):/(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
    //ERROR NAME
    if(!input.name) error.name = 'Debes ingresar un nombre valido'
    else if(!/^[a-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(input.name)) error.name = 'El nombre no puede contener mayusculas/numeros/caracteres especiales'
    else if(input.name.length > 10 ) error.name = 'El nombre ingresado es muy largo'
    else if(input.name.length < 3) error.name = 'El nombre ingresado es muy corto'
    
    //ERROR HEALTH
    else if(!input.health) error.health = 'Debes ingresar un valor'
    else if(input.health  > 150) error.health = 'La vida  no puede ser superior a 150'
    else if(input.health < 10) error.health = 'La vida  no puede ser inferior a 10'
    
    //ERROR ATTACK
    else if(!input.attack) error.attack = 'Debes ingresar un valor'
    else if(input.attack > 150) error.attack = 'El ataque no puede ser superior a 150'
    else if(input.attack < 10) error.attack = 'El ataque no puede ser inferior a 10'
    
    //ERROR DEFENSE
    else if(!input.defense) error.defense = 'Debes ingresar un valor'
    else if(input.defense > 150) error.defense = 'La defensa no puede ser superior 150'
    else if(input.defense < 10) error.defense = 'La defensa no puede ser inferior a 10'
    
    //ERROR SPEED
    else if(!input.speed) error.speed = 'Debes ingresar un valor'
    else if(input.speed > 150) error.speed = 'La velocidad no puede ser superior a 150'
    else if(input.speed < 10) error.speed = 'La velocidad no puede ser inferior a 10'
    
     //ERROR HEIGHT
    else if(!input.height) error.height = 'Debes ingresar un valor'
    else if(input.height > 30) error.height = 'La altura no puede ser superior a 30'
    else if(input.height < 1) error.height = 'La altura no puede ser inferior a 1'
    
    //ERROR WEIGHT
    else if(!input.weight) error.weight = 'Debes ingresar un valor'
    else if(input.weight > 1500) error.weight = 'El peso no puede ser superior a 1500kg'
    else if(input.weight < 10) error.weight = 'El peso no puede ser inferior a 10kg'
    
    //ERROR TYPES
    else if(!input.types) error.types = 'Debes ingresar al menos un valor'
    else if(input.types < 1) error.types = 'El Pokemon debe tener al menos un Type'
    else if(input.types > 2) error.types = 'El Pokemon no puede tener mas de dos Types'
    // ERROR IMG
    else if(input.img && !/[(http(s)?):/(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(input.img)) error.img = 'La imagen debe ser HTTP'

    return error
}


export default function CreatePokemon() {
    const dispatch = useDispatch()
    const typesState = useSelector(state => state.pokemonsType)
    const [boton, setBoton] = useState(true)
    const [btnTypes, setBtnTypes] = useState(true)
    
    
    //MANEJO DE ERRORES
    const [error, setError] = useState('')
    //MANEJO DE ESTADO DEL INPUT
    const [input, setInput] = useState({
        name: '',
        health: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
        img: ''
        
    })
    

    //PARA TRAER LOS TYPES DE DB
    useEffect(() => {
        dispatch(getTypes())

    }, [dispatch])

    // BOTON PARA CONTROLAR MAXIMOS DE TYPES
    useEffect(() => {
        if(input.types.length === 2) {
            setBtnTypes(false)
        } else {
            setBtnTypes(true)
        }
    }, [input])
   
    
    const handleOnChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    
    const handleOnSumbit = (e) => {
        e.preventDefault()
        if(input.types.length === 0){
            input.types.push('normal')
        }
        dispatch(createPokemon(input))
        alert('Pokemon creado correctamente')
        setInput({
            name: '',
            health: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            img: '',
            types: [],

        })
        
    }

    const addType = (type) => {
        if(input.types){
            input.types.push(type)
        }
        setInput({
            ...input,
            types: input.types
        })
    }

    const deleteType = () =>{
        if(input.types.length){
            input.types.pop()
        }
        setInput({
            ...input,
            types: input.types
        })
    }
    console.log(input)

    //PARA ACTIVAR EL BOTON Y PODER MANDAR EL FORMULARIO
    useEffect(() => {
        if(!error.name && !error.health && !error.attack && !error.defense && !error.speed && !error.height && !error.weight && !error.types && !error.img
          && input.name && input.health && input.attack && input.defense && input.speed && input.height && input.weight && (input.types.length > 0)){
            setBoton(false)
        }else {
            setBoton(true)
        }
    }, [error, input])
     
    return (
        <div>
            <div>
                <Nav />
            </div>
            <h2>Create Your Pokemon</h2>
            <form onSubmit={e => handleOnSumbit(e)}>
            
                <div>
                    <button type='button' onClick={() => deleteType()}>Delete Last Type Selected</button>
                    {
                        typesState.map(e => {
                            return(
                                <button type='button' key={e.id} onClick={() => addType(e.name)} disabled={!btnTypes} defaultValue='normal'>{e.name}</button>
                            ) 
                        })
                    }
                    {error.types && <p>{error.types}</p>}
                </div>
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={input.name} onChange={handleOnChange}/>
                    {error.name && <p>{error.name}</p>}
                </div>
                <div>
                    <label>Health: </label>
                    <input type="number" name='health' value={input.health} onChange={handleOnChange} />
                    {error.health && <p>{error.health}</p>}
                </div>
                <div>
                    <label>Attack: </label>
                    <input type="number" name='attack' value={input.attack} onChange={handleOnChange} />
                    {error.attack && <p>{error.attack}</p>}
                </div>
                <div>
                    <label>Defense: </label>
                    <input type="number" name='defense' value={input.defense} onChange={handleOnChange} />
                    {error.defense && <p>{error.defense}</p>}
                </div>
                <div>
                    <label>Speed: </label>
                    <input type="number" name='speed' value={input.speed} onChange={handleOnChange} />
                    {error.speed && <p>{error.speed}</p>}
                </div>
                <div>
                    <label>Height: </label>
                    <input type="number" name='height' value={input.height} onChange={handleOnChange} />
                    {error.height && <p>{error.height}</p>}
                </div>
                <div>
                    <label>Weight: </label>
                    <input type="number" name='weight' value={input.weight} onChange={handleOnChange} />
                    {error.weight && <p>{error.weight}</p>}
                </div>
                <div>
                    <label>IMG: </label>
                    <input type="text" name='img' value={input.img} onChange={handleOnChange} placeholder='Imagen HTTP'/> 
                    {error.img && <p>{error.img}</p>}
                </div>
                <div>
                    <button type="submit" disabled={boton} >Create Pokemon</button>
                </div>
            </form>
            <div>
                <p>{input.name}</p>
                <p>{input.health}</p>
                <p>{input.attack}</p>
                <p>{input.defense}</p>
                <p>{input.speed}</p>
                <p>{input.height}</p>
                <p>{input.weight}</p>
                <p>{input.types.join(' ')}</p>
                
                <img src={input.img ? input.img : Silueta} alt='Rompiste todo' />
            </div>
        </div>)
}