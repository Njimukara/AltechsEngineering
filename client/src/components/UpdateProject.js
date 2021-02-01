import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { DragSwitch } from 'react-dragswitch'
import './UpdateProject.css';



function UpdateProject({ project_id, Project_Name, Project_Type, Project_SubType, Project_Description, Project_Author, StartDate, EndDate}) {
    const getClients = () => {
        Axios.get("http://localhost:3001/api/clients")
        .then((response) => {
            // console.log(response.data[0])
            setClients(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const [Clients, setClients] = useState([]);
    const [Employees, setEmployees] = useState([]);

    const [ProjectType, setProjectType] = useState(Project_Type);
    const [ProjectSubType, setProjectSubType] = useState(Project_SubType);
    const [ProjectName, setProjectName] = useState(Project_Name);
    const [ProjectAuthor, setProjectAuthor] = useState(Project_Author);
    const [ProjectDescription, setProjectDescription] = useState(Project_Description);
    const [Project_Team, setProject_Team] = useState("");
    const [Project_startDate, setProject_startDate] = useState(StartDate);
    const [Project_endDate, setProject_endDate] = useState(EndDate);
    const [Project_status, setProject_status] = useState(false);

    const updateForm = (e) => {
        e.preventDefault()
        Axios.put(`http://localhost:3001/api/project/update/${project_id}`, {
            Project_Name: Project_Name,
            Project_Type: Project_Type,
            Project_Author: Project_Author,
            Project_Team: Project_Team,
            Project_SubType: Project_SubType,
            StartDate: StartDate,
            EndDate: EndDate,
            Project_status: Project_status,
            Project_Description: Project_Description
        })
        .then((response) => {
            console.log('update ', response)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getEmployees = () => {
        Axios.get(`http://localhost:3001/api/employees`)
        .then((response) => {
            setEmployees(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect (() => {
        getClients();
    },[])
    return (
        <section>
            <div>
                <h2 className='update_heading'>Update Project</h2>
                <form className='updateProject__form'>

                    <label>Select Type of Project</label>
                    <select  value={ProjectType} onChange={(event) => {
                        setProjectType(event.target.value);}} name="project_type">
                        <option> -- Select -- </option>
                        <option value="Andriod-IOS-Desktop">Andriod-IOS-Desktop</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Wordpress Development">Wordpress Development</option>
                        <option value="Full Stack Web Development">Full Stack Web Development</option>
                    </select>
                    { Project_Type ==='Graphic Design' &&
                        <div className='project__subtype'>
                            <label>Select Sub-Category</label>
                            <span>Hold down ctrl and select options</span> 
                            <select value={ProjectSubType} multiple size='7' onChange={(event) => {
                                setProjectSubType(event.target.value);}} name="project_type">
                                <option> -- Select -- </option>
                                <option value="Logo Design">Logo Design</option>
                                <option value="Brochures">Brochures</option>
                                <option value="Wordpress Development">Wordpress Development</option>
                                <option value="Full Stack Web Development">Full Stack Web Development</option>
                            </select>
                        </div>
                    }

                    <label>Project Name</label>
                    <input value={ProjectName} type="text" onChange={(event) => {
                        setProjectName(event.target.value)}}/>

                    <label>Choose Project Author</label>
                    <select value={ProjectAuthor} onChange={(event) => {
                        setProjectAuthor(event.target.value)}} name="project_type">
                        <option> -- Default -- </option>
                        {Clients.map(client => (
                            <option
                                value = {client.Client_Id}
                            >{client.Client_Name}</option>
                        ))}
                    </select>
                    <span className='project__author_message'>Client not found?, Please <Link className='project__author_message_link' to='register'>create client account here first</Link></span>
                    <div className='dates'>

                        <label>Start Date</label>
                        <input className='date' type="date" onChange={(event) => {
                            setProject_startDate(event.target.value)}}/>

                        <label>End Date</label>
                        <input className='date' type="date" onChange={(event) => {
                            setProject_endDate(event.target.value)}}/>

                    </div>
                    <label>Project Description</label>
                    <textarea value={ProjectDescription} cols="30" rows="5" type="text" onChange={(event) => {
                        setProjectDescription(event.target.value)}}>
                    </textarea>
                    <div>
                    <span>Project Completed?</span>
                        <DragSwitch className='completed' Project_status={Project_status} onChange={(e) => {
                                setProject_status(e)}}
                        />
                    </div>
                    <button onClick={updateForm} className='newProject' type='submit'>Create Project</button>
                </form>
            </div>
        </section>
    )
}

export default UpdateProject
