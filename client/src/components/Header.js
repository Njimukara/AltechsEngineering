import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
    const [ login, setLogin ] = useState([]);
    const [ accountType, setAccountType ] = useState([]);
    const [ Name, setName ] = useState('');
    const authenticate = () => {
        setLogin(window.localStorage.getItem('loggedIn'))
        setAccountType(window.localStorage.getItem('type'))
        setName(window.localStorage.getItem('name'))
    }

    const handleAuthentication = () => {
        if (login) {
            window.localStorage.clear()
            window.location.reload()
        }
    }
    useEffect(() => {
        authenticate();
    }, []);

    return (
        <header className='header'>
            <div className='header__image'>
                <Link className='header__logo_image' to='/'><img className="header__logo" src="/assets/images/logo-minimal-md.png" alt="Altechs Engineering Logo"/>
                <span>Altechs Engineering</span></Link>
            </div>

            <div className="header__nav">
               <ul className='header__ul'>
                   {accountType === 'Client' && <li><Link to='/' className='links'>Accueil</Link></li>}
                   {accountType === 'Employee' && <li><Link to='/projects' className='links'>Projets</Link></li>}
                   {accountType === 'Employee' && <li><Link to='/employees' className='links'>Employés</Link></li>}
                   {accountType === 'Employee' && <li><Link to='/clients' className='links'>Clients</Link></li>}
               </ul> 
            </div>

            <div className="header__signin">
                <Link className='header__login' onClick={handleAuthentication} to={!login && '/login'}><span>{login ? 'Log Out' : 'Sign In'}</span></Link><span className='header__space'>/</span>
                <Link className='header__register' to='/'><span>Bienvenu</span></Link>
            </div>
        </header>
    )
}

export default Header
