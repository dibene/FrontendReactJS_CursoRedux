import React from 'react'
import {Link } from 'react-router-dom'

export default function Menu() {
    return (
        <nav id="menu">
            <Link to="/">Usuarios</Link>
            <Link to="/tasks">Tareas</Link>
        </nav>
    )
}
