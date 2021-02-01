import React, { useEffect, useState } from 'react';
import './Services.css';
import { Card } from 'react-bootstrap';
import { useStateValue } from './StateProvider';
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

function Services() {

    const [ basket, setBasket ] = useState([]);
    const [ {projects}, dispatch ] = useStateValue();

    useEffect(() => {
        // getProjects();
        getProject(); 
        window.addEventListener("beforeunload", alertUser);
        return () => {
        window.removeEventListener("beforeunload", alertUser);
        }
    }, []);

    const alertUser = (e) => {
        e.preventDefault();
        e.returnValue = "";
    };
    const authors_id = window.localStorage.getItem('id')

    const getProject = (id) => {
        id = authors_id
        Axios.get(`http://localhost:3001/api/client/projects/${id}`)
        .then((response) => {
            console.log(response)
            const basketData = response.data
            setBasket(basketData)
        })
        .catch(err => {
            console.log(err)
        })
    }
    

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
        <section className="service">
            <div className="service__column1">
                <div className="service__cards">
                {basket.slice(0, 3).map(project => (
                    <Card  className='service__card'>
                        <Card.Img className='service__card_img' variant="top" src="/assets/images/software engineering.jpg" />
                        <Card.Body>
                            <Card.Title className='service__card_title'>{project.Project_Name}</Card.Title>
                            <Card.Text className='service__card_text'>
                            {project.Project_Description}
                            </Card.Text>
                            <Link to={{pathname: `/projectdetails/${project.Project_Id}`, state: `project_id=${project.Project_Id}`}}> <button >View Details</button></Link>
                        </Card.Body>
                    </Card>
                ))}   
                </div>
                <div className="service__cards">
                {basket.slice(4, 7).map(project => (
                    <Card  className='service__card'>
                        <Card.Img className='service__card_img' variant="top" src="/assets/images/software engineering.jpg" />
                        <Card.Body>
                            <Card.Title className='service__card_title'>{project.Project_Name}</Card.Title>
                            <Card.Text numberOfLines={1} className='service__card_text'>
                            {project.Project_Description.lenght}
                            </Card.Text>
                            <Link to={{pathname: `/projectdetails/${project.Project_Id}`}}> <button >View Details</button></Link>
                        </Card.Body>
                    </Card>
                ))}   
                </div>
            </div>
        </section>
    )
}

export default Services
