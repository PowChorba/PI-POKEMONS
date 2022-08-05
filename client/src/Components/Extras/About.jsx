import React from 'react';
import Nav from '../Nav';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FiMail } from "react-icons/fi";
import s from './About.module.css'

export default function About(){
    return(
        <div>
            <div>
                <Nav/>
            </div>
            <div className={s.contenedor}>
                <h1 className={s.titulo}>About</h1>
                <div className={s.data}>
                    <p>This was an individual final project of the Henry`s Bootcamp Full Web Developer. The functionality of this page is a Single Page Application (SPA) based on
                        the Pokemon theme with information pulled from a REST API. In this app you can filter, sort and search for Pokemons with all their information. In turn, a new 
                        Pokemon can be created.
                    </p>
                    <h4 className={s.hcuatro}>Technologies</h4>
                    <p>React - Redux - PostreSQL - JavaScript - Express - Sequelize - CSS</p>
                    <h4 className={s.hcuatro}>Developer</h4>
                    <p>Chorbadjian Agop Sebastian</p>
                    <div className={s.iconos}>
                        <a href="https://www.linkedin.com/in/agop-chorbadjian-369767218/" target='onblank_' className={s.icono}>
                            <FaLinkedin/>
                        </a>
                        <a href="https://github.com/PowChorba" target='onblank_' className={s.icono}>
                            <FaGithub />
                        </a>
                        <a href="mailto:pow.chorba.99@gmail.com" target='onblank_' className={s.icono}>
                            <FiMail/>
                        </a>
                    </div>
                </div>
            </div>
        </div>)
}

