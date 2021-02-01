import React,  { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useStateValue } from './StateProvider';

import './Project.css';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

function Project() {

    const [ basket, setBasket ] = useState([]);
    const [ {projects}, dispatch ] = useStateValue();

    useEffect(() => {
        getProjects();
        console.log("Running ")
    }, []);

    const getProjects = () => {
        Axios.get("http://localhost:3001/api/projects")
        .then((response) => {
            const basketData = response.data
            setBasket(basketData)
            dispatch({
                type: 'SET_PROJECTS',
                item: {
                    projects: response.data
                }
            })
        })
        .catch (err => {
            console.log(err)
        })
        return basket
    };

    return (
        <section className='project'>
            {basket.map(project => (            
            <Card  className='project__card'>
                <Card.Img className='project__card_img' variant="top" src="/assets/images/logo-minimal-md.png" />
                <Card.Body>
                    <Card.Title className='project__card_title'>{project.Project_Name}</Card.Title>
                    <Card.Text className='project__card_text'>
                    {project.Project_Text}
                    </Card.Text>
                  <Link to='/projects'> <button className='project__card_button'> Details</button></Link> 
                </Card.Body>
            </Card>
            ))}
            
        </section>
    )
}

export default Project
