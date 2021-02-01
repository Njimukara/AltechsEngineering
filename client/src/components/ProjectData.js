import React, { useState } from 'react';
import './ProjectData.css';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import { useStateValue } from './StateProvider';
import { Button, Modal } from 'react-bootstrap';

function ProjectData({Project_Id, Project_Title, Project_Description}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if(window.localStorage.getItem('loggedIn')== null) {
            setShow(true);
        } else {
            getProject(Project_Id)
        }
    }
    const [{project}, dispatch ] = useStateValue();

    const getProject = (id) => {
            id = Project_Id
            Axios.get(`http://localhost:3001/api/project/${id}`)
            .then((response) => {
                console.log(response.data)
                dispatch({
                type: 'SET_CURRENT_PROJECT',
                item: {
                    project: response.data
                }
            })
                history.push(`/projectdetails/${id}`);
            })
    }
    let history = useHistory();

    return (
        <div>
            <div className="projectList__card">
                <div className="projectList__image">
                    <img src="assets/images/logo-minimal-md.png" alt=""/>
                </div>
                <div className="projectList__info">
                    <h5 className='project__title'>{Project_Title}</h5>
                    <p className="project__intro">
                        {Project_Description}
                    </p>
                    <span type='button' onClick={getProject, handleShow} className='project__details'>Plus</span>
                  
                        <Modal size="lg" show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title className='modal__heading'>Message From Altechs Engineering</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='modal__body'>
                                Please <Link className='modal__link' to='/login'>Sign in</Link>  to Your account to view details of each project.
                                In case you don't have an account, you can create your account <Link className='modal__link' to='/register'>Here.</Link>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button className='modal__button' onClick={handleClose}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>
                </div>
            </div>
        </div>
    )
}

export default ProjectData