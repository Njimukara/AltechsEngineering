import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './AddProject.css';
import Axios from 'axios';

function AddProject() {

    const [Clients, setClients] = useState([]);
    const [Project_Name, setProject_Name] = useState("");
    const [Project_Type, setProject_Type] = useState("");
    const [Project_SubType, setProject_SubType] = useState("None");
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [Project_status, setProject_status] = useState(0);
    const [Project_Description, setProject_Description] = useState("");
    const [Completion_Rate, setCompletion_Rate] = useState(0);
    const [Project_Author, setProject_Author] = useState("");
    const history = useHistory();

    var getSelectedValues =  function(e) {
        let value = Array.from(e.target.selectedOptions, option => option.value);
            setProject_SubType(value.join())
    };
    console.log(Project_SubType)
    const getClients = () => {
        Axios.get("http://localhost:3001/api/clients")
        .then((response) => {
            console.log(response.data[0])
            setClients(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3001/api/project/add", {
        Project_Name: Project_Name,
        Project_Type: Project_Type,
        Project_SubType: Project_SubType,
        StartDate: StartDate,
        EndDate: EndDate,
        Project_status: Project_status,
        Project_Description: Project_Description,
        Completion_Rate: Completion_Rate,
        Project_Author: Project_Author
        })
        .then((response) => {
            console.log(response)
            history.push('/projects')
        })
        .catch((err) => {
            console.log(err)
        })
    };

    useEffect(() => {
        getClients();
    }, []);

    return (
        <div className='addProject'>
            <div className='addPoject__details'>
                <h2 className='addProject__heading'>Nouveau projet</h2>
                <form className='addProject__form'>
                    <label>Sélectionnez le type de projet</label>
                    <select onChange={(event) => {
                        setProject_Type(event.target.value);}} name="project_type">
                        <option> -- Select -- </option>
                        <option value="Andriod-IOS-Desktop">Andriod-IOS-Desktop</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Wordpress Development">Wordpress Development</option>
                        <option value="Full Stack Web Development">Full Stack Web Development</option>
                    </select>
                    { Project_Type ==='Graphic Design' &&
                        <div className='project__subtype'>
                            <label>Sélectionnez le sous-type</label>
                            <span>Maintenez la touche Ctrl enfoncée et sélectionnez les options</span> 
                            <select multiple size='7' onChange={getSelectedValues} name="project_type">
                                <option value="Logo Design">Logo Design</option>
                                <option value="Brochures">Brochures</option>
                                <option value="Wordpress Development">Wordpress Development</option>
                                <option value="Full Stack Web Development">Full Stack Web Development</option>
                            </select>
                        </div>
                    }

                    <label>Nom du Projet</label>
                    <input type="text" onChange={(event) => {
                        setProject_Name(event.target.value)}}/>
                    
                    <label>Choisissez l'auteur du Projet</label>
                    <select onChange={(event) => {
                        setProject_Author(event.target.value)}} name="project_type">
                        <option> -- Default -- </option>
                        {Clients.map(client => (
                            <option
                                value = {client.Client_Id}
                            >{client.Client_Name}</option>
                        ))}
                    </select>
                    <span className='project__author_message'>Client introuvable?, <Link className='project__author_message_link' to='register'>Veuillez créer un compte client ici</Link></span>

                    <label>Début de projet</label>
                    <input type="date" onChange={(event) => {
                        setStartDate(event.target.value)}}/>

                    <label>Fin de Projet</label>
                    <input type="date" onChange={(event) => {
                        setEndDate(event.target.value)}}/>

                    <label>Description du projet</label>
                    <textarea cols="30" rows="5" type="text" onChange={(event) => {
                        setProject_Description(event.target.value)}}>
                    </textarea>

                    <button onClick={submitForm} className='newProject' type='submit'>Créer le projet</button>
                </form>
            </div>
            <div className='addProject__image'>
                <img src="/assets/images/new project.jpg" alt=""/>
            </div>
        </div>
    )
}

export default AddProject
