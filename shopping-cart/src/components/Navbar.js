import React from 'react';
import { Link } from 'react-router-dom'
const Navbar = ()=>{
    return(
        <nav className="w3-bar w3-black">
            <div className="container" style={{backgroundColor:"black"}}>
                <Link to="/" className="w3-button w3-bar-item">Cumpărături</Link>

                <ul className="right">
                    <li><Link to="/" className="w3-button w3-bar-item">Magazin</Link></li>
                    <li><Link to="/cart" className="w3-button w3-bar-item">Coșul meu</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar