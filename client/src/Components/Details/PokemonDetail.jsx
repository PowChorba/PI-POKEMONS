import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonDetails } from "../Redux/Actions";
import CardComplete from './CardComplete.jsx'
import Silueta from '../imagenes/picachu.png'
import pokeball from '../imagenes/asd.gif'
import s from './Details.module.css'


export default function Details() {
    const dispatch = useDispatch()
    const params = useParams()
    const pokemonDetail = useSelector(state => state.pokemonDetail)
    
    useEffect(() => {
        dispatch(getPokemonDetails(params.id))
        
    }, [dispatch, params.id])    
    
    return(
        <div className={s.contenedor}>
            {
                typeof pokemonDetail[0] === 'object' && pokemonDetail[0].id == params.id ?
                <div className={s.contenedorCard}>
                    <h2 className={s.titulo}>Pokemon Detail</h2>
                    <p className={s.id}>ID: {pokemonDetail[0].id}</p>
                    <CardComplete
                        
                        name={pokemonDetail[0].name}
                        img={pokemonDetail[0].img ? pokemonDetail[0].img : Silueta}
                        health={pokemonDetail[0].health}
                        attack={pokemonDetail[0].attack}
                        defense={pokemonDetail[0].defense}
                        speed={pokemonDetail[0].speed}
                        height={pokemonDetail[0].height}
                        weight={pokemonDetail[0].weight}
                        types={pokemonDetail[0].types}
                        
                        />
                </div>
                : <div className={s.prueba}><img src={pokeball} alt="asd" className={s.precarga}/></div>
            }
          
        </div>)
}

// <img src={Pokeball} alt='asd' className={s.precargar}/>






// const dispatch = useDispatch()
// const params = useParams()

// useEffect(() => {
//     dispatch(getPokemonDetails(params.id))
// },[dispatch,params.id])

// const pokemonDetail = useSelector(state => state.pokemonsDetail)

// return(
//     <div>
//         <h2>ASD</h2>
//         {
//             pokemonDetail.filter(e=> e.id === params.id) ?
//             <div>
//                 <CardComplete
                
//                 name={pokemonDetail.name}
//                 img={pokemonDetail.img}
//                 health={pokemonDetail.health}
//                 attack={pokemonDetail.attack}
//                 defense={pokemonDetail.defense}
//                 speed={pokemonDetail.speed}
//                 height={pokemonDetail.height}
//                 weight={pokemonDetail.weight}
//                 types={pokemonDetail.types}
//                 />
//             </div>
//             : <span>Loading...</span>
//         }
//     </div>)