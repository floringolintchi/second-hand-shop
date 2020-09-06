import React from 'react';
import { Link } from 'react-router-dom'
const Navbar = ()=>{
    return(
        <nav className="nav-wrapper">
            <div className="container" style={{backgroundColor:"black"}}>
                <Link to="/" className="brand-logo">Cumpărături</Link>

                <ul className="right">
                    <li><Link to="/">Magazin</Link></li>
                    <li><Link to="/cart">Coșul meu</Link></li>
                    <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar