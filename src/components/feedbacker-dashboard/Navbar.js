import React from 'react'
import { NavLink } from 'react-router-dom'
import "../../styles/navbar.scss"

function Navbar() {

    return (
        <div className="left-bar">
            <div className="left-bar header">
                Feedbacker
            </div>
            <div className="left-bar container">
                <nav>
                    <NavLink to="#">ОТЗЫВЫ</NavLink> 
                    <NavLink to="/stat" target="_blank">ОТЧЕТ</NavLink> 
                </nav>
            </div>
        </div>
    )
}

export default Navbar
