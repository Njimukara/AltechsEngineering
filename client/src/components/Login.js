import React, { useState } from 'react';
import './Login.css'
import { Link , useHistory } from 'react-router-dom';
import Axios from 'axios';
import { useStateValue } from './StateProvider';


function Login() {

    const [ {user}, dispatch ] = useStateValue();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [Account_Type, setAccount_Type] = useState("");

    let history = useHistory();

    const login = (e) => {
        e.preventDefault()
        if (Account_Type ==="Client") {
            Axios.post("http://localhost:3001/api/client/login", {
            email: email,
            password: password,
            }).then((response) => {
            if (response.data.LoggedIn == true) {
                window.localStorage.setItem("loggedIn", response.data.LoggedIn);
                window.localStorage.setItem("name", response.data.name);
                window.localStorage.setItem("id", response.data.id);
                window.localStorage.setItem("type", response.data.Account_type);
                dispatch({
                    type: 'SET_USER',
                    item: {
                        user: response.data.email
                    }
                })
                console.log(user)
                history.push('/');
            } else {
                setErrorMessage(response.data.message);
            }
            });
        } else {
            Axios.post("http://localhost:3001/api/employee/login", {
            email: email,
            password: password,
            }).then((response) => {
            if (response.data.LoggedIn == true) {
                window.localStorage.setItem("loggedIn", response.data.LoggedIn);
                window.localStorage.setItem("name", response.data.name);
                window.localStorage.setItem("id", response.data.id);
                window.localStorage.setItem("type", response.data.Account_type);
                dispatch({
                    type: 'SET_USER',
                    item: {
                        user: response.data.email
                    }
                })
                console.log(user)
                history.push('/projects');
            } else {
                setErrorMessage(response.data.message);
            }
            });
        }
    };

    return (
        <div className='login'>
            <div className="login__card">
                <div className="login__card_logo">
                    <Link className='logo__cardImage' to='/'><img src="assets/images/logo-minimal-md.png" alt="Altechs Engineering logo"/></Link>
                    <h2>Sign In</h2>
                </div>
                <form className="login__card_form"  >
                    <label>Choose Account Type</label>
                    <select onChange={(event) => {
                        setAccount_Type(event.target.value);}} name="project_type">
                        <option> -- Select -- </option>
                        <option value="Client">Client Sign In</option>
                        <option value="Employee">Emloyee Sign In</option>
                    </select>

                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder='youremail@mail.com' onChange={(event) => {
                    setEmail(event.target.value);}}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(event) => {
                    setPassword(event.target.value); }}/>
                    <button type='submit' onClick={login}>Sign in</button>
                    <h6 style={{ color: "red" }}>{errorMessage} </h6>
                </form>
            </div>
        </div>
    )
}

export default Login
