import React from 'react'

import './Header.css';

function Header() {
    return (
        <header className='header'>
            <div className='header__image'>
                <img className="header__logo" src="/assets/images/logo-minimal-md.png" alt="Altechs Engineering Logo"/>
                <span>Altechs Engineering</span>
            </div>

            <div className="header__nav">
               <ul className='header__ul'>
                   <li>Home</li>
                   <li>About us</li>
                   <li>Services</li>
                   <li>Projects</li>
               </ul> 
            </div>

            <div className="header__signin">
                <span>Sign In</span>/
                <span>Create Account</span>
            </div>
        </header>
    )
}

export default Header
