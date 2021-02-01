import React, { useState, useEffect } from 'react'
import './ProjectList.css'
import Axios from 'axios';
import ProjectData from './ProjectData';
import { Link } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';


function ProjectList() {
    const [basket, setBasket] = useState([]);
    const [AccountType, setAccountType] = useState('');

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = () => {
        Axios.get("http://localhost:3001/api/projects")
        .then((response) => {
            const basketData = response.data
            setBasket(basketData)
            setAccountType(window.localStorage.getItem('type'))
        })
        .catch (err => {
            console.log(err)
        })

        return basket
    };

    return (
        <div className='projectList'>
        {AccountType === 'Employee' && <Link to='/newproject'>
            <button className='projectList__button'>Ajouter Un Projet</button></Link>}
            <h3 className='projectList__heading'>All Projects</h3>
            {basket.map(project => (
                <ProjectData
                    Project_Id = {project.Project_Id}
                    Project_Title = {project.Project_Name}
                    Project_Description = {project.Project_Description}
                />
            ))}
        </div>
    )
}

export default ProjectList
