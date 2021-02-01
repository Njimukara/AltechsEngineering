import React, { useState } from 'react'
import './Register.css'
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';


function Register() {

    const [Client_Name, setClient_Name] = useState("");
    const [Client_Email, setClient_Email] = useState("");
    const [Client_Password, setClient_Password] = useState("");
    const [Client_Phone, setClient_Phone] = useState("");
    const [Employee_Name, setEmployee_Name] = useState("");
    const [Employee_Email, setEmployee_Email] = useState("");
    const [Employee_Phone, setEmployee_Phone] = useState("");
    const [Employee_Password, setEmployee_Password] = useState("");
    const [Employee_StartDate, setEmployee_StartDate] = useState("");
    const [Account_Type, setAccount_Type] = useState("");

    let history = useHistory();

    const submitForm = (e) => {
        e.preventDefault()
        if (Account_Type === 'Client') {
            Axios.post("http://localhost:3001/api/client/add", {
            Client_Name: Client_Name,
            Client_Email: Client_Email,
            Client_Phone: Client_Phone,
            Client_Password: Client_Password,
            Account_Type: Account_Type
            })
            .then((response) => {
                console.log(response)
                history.push('/clients')
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            Axios.post("http://localhost:3001/api/employee/add", {
            Employee_Name: Employee_Name,
            Employee_Email: Employee_Email,
            Employee_Phone: Employee_Phone,
            Employee_Password: Employee_Password,
            Employee_StartDate: Employee_StartDate,
            Account_Type: Account_Type
            })
            .then((response) => {
                console.log(response)
                history.push('/projects')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    };
   
    return (
        <div className='register'>
            <div className="register__card">
                <div className="register__card_logo">
                    <img src="assets/images/logo-minimal-md.png" alt="Altechs Engineering logo"/>
                    <h2>Créer Un Nouveau Compte</h2>
                </div>
                <form className="register__card_form">

                    <label>Sélectionnez le type de Compte</label>
                    <select onChange={(event) => {
                        setAccount_Type(event.target.value);}}>
                        <option> -- Select -- </option>
                        <option value="Client">Client</option>
                        <option value="Employee">Employé</option>
                    </select>

                    {
                        Account_Type === "Client" &&
                        <div className='form__data'>
                            <label htmlFor="name">Name</label>
                            <input name='Client_Name' onChange={(event) => {
                        setClient_Name(event.target.value);}} type="text" placeholder='YOur Name Please'/>

                            <label htmlFor="phone">Phone</label>
                            <input name='Client_Phone' onChange={(event) => {
                        setClient_Phone(event.target.value);}} type="number"/>
                            
                            <label htmlFor="username">Email</label>
                            <input name='Client_Email' onChange={(event) => {
                        setClient_Email(event.target.value);}} type="email" placeholder='user@gmail.com'/>

                            <label htmlFor="password">Password</label>
                            <input name='Client_Password' onChange={(event) => {
                        setClient_Password(event.target.value);}} type="password"/>
                        </div>
                    }
                    {
                        Account_Type === "Employee" && 
                        <div className='form__data'>
                            <label htmlFor="name">Name</label>
                            <input name='Employee_Name' onChange={(event) => {
                        setEmployee_Name(event.target.value);}} type="text" placeholder='YOur Name Please'/>

                            <label htmlFor="phone">Phone</label>
                            <input name='Employee_Phone' onChange={(event) => {
                        setEmployee_Phone(event.target.value);}} type="number" placeholder=''/>
                            
                            <label htmlFor="username">Email</label>
                            <input name='Employee_Email' onChange={(event) => {
                        setEmployee_Email(event.target.value);}} type="email" placeholder='user@gmail.com'/>

                            <label htmlFor="username">Start Date</label>
                            <input name='Employee_StartDate' onChange={(event) => {
                        setEmployee_StartDate(event.target.value.slice(0, 10));}} type="date" />

                            <label htmlFor="password">Password</label>
                            <input name='Employee_Password' onChange={(event) => {
                        setEmployee_Password(event.target.value);}} type="password"/>
                        </div>
                    }
                    <button onClick={submitForm}> Sign Up </button>
                </form>
            </div>
                <h5>Vous avez déjà un compte?, <Link to='/login'><span>Se Connecter</span></Link></h5>
        </div>
    )
}

export default Register
