import React, { useState, useEffect } from 'react'
import './ProjectDetails.css'
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';
import ProgressBar from 'react-customizable-progressbar'
import Accordion from 'react-bootstrap/Accordion'
import { Card } from 'react-bootstrap';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import GroupIcon from '@material-ui/icons/Group';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import CommentIcon from '@material-ui/icons/Message';
import SubjectIcon from '@material-ui/icons/Subject';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckIcon from '@material-ui/icons/Check';
import { useStateValue } from './StateProvider';
import UpdateProject from './UpdateProject';

function ProjectDetails() {

    var getSelectedValues =  function(e) {
        let value = Array.from(e.target.selectedOptions, option => option.value);
            setProject_Team(value.join())
    };

    const [project, dispatch] = useStateValue()
    const [Engineers, setEngineers] = useState([]);
    const [Employees, setEmployees] = useState([]);
    const [Project, setProject] = useState([]);
    
    const [progress_Title, setProgress_Title] = useState("");
    const [progress, setProgress] = useState("");
    const [Project_progress, setProject_progress] = useState([]);
    const [Clients, setClients] = useState([]);
    const [Project_Team, setProject_Team] = useState("");

    const [Subject, setSubject] = useState("");
    const [Subject_Description, setSubject_Description] = useState("");
    const { project_id } = useParams();

    const account_type = window.localStorage.getItem('type')
    const addProgress = (e) => {
        e.preventDefault()
        Axios.post(`http://localhost:3001/api/progress/add`, {
            Project_Id: project_id,
            Progress_Title: progress_Title,
            Progress: progress
        })
        .then((result) => {
            console.log('Here is the result ==> ', result)
        })
        .catch(err => {console.log("An Error, ", err)})
    }

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

    const getEmployees = () => {
        Axios.get(`http://localhost:3001/api/employees`)
        .then((response) => {
            setEmployees(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getprojectprogress = (id) => {
        id = project_id
        Axios.get(`http://localhost:3001/api/progress/${id}`)
        .then((response) => {
            console.log('here ', response.data)
            setProject_progress(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getEngineers= (id) => {
        id = project_id
        Axios.get(`http://localhost:3001/api/employees_project/${id}`)
        .then((response) => {
            console.log(response.data)
            setEngineers(response.data)
        })  
    }

    const getProject = (id) => {
        id = project_id
        Axios.get(`http://localhost:3001/api/project/${id}`)
        .then((response) => {
            setProject(response.data)
            dispatch({
            type: 'SET_CURRENT_PROJECT',
            item: {
                Project_Id: Project.Project_Id,
                Project_Name: Project.Project_Name,
                Project_SubType: Project.Project_SubType,
                Project_Author: Project.Project_Author,
                Project_Description: Project.Project_Description,
                StartDate: Project.StartDate,
                EndDate: Project.EndDate
            }
        })
        })
    }

    let date1 = new Date (Project.StartDate)
    let date2 = new Date (Project.EndDate)
    let today = new Date()

    // console.log(today, date2)
    const getDifferenceInDays = (diffInDays) => {
        // const diffInDays = Math.abs(today - date2);
        let absdiffInDays = Math.abs(diffInDays)
        return Math.floor(absdiffInDays / (1000 * 60 * 60 * 24));
    }
    const overdue = () => {
        const diffInDays = (date2 - today);
        if (diffInDays < 0) {
            let numberofdays = getDifferenceInDays(diffInDays)
            return "Projet en retard par " + numberofdays + ' Jour(s)'
        } else if(diffInDays > 0) {
            return getDifferenceInDays(diffInDays) + ' Jour(s) restant pour terminer le projet'
        } else {
            return "Le projet doit se terminer aujourd'hui"
        }
    }

    useEffect(() => {
        getProject();
        getEmployees();
        getEngineers();
        getClients();
        getprojectprogress();
    }, []);

    const submitForm = (e) => {
        e.preventDefault()
        Axios.post(`http://localhost:3001/api/comment/add`, {
            Project_Id: project_id,
            Authors_Id: window.localStorage.getItem('id'),
            Subject: Subject,
            Description: Subject_Description,
            Comment_Date: new Date().toISOString().slice(0, 10),
        })
        .then((response) => {
            console.log(response)
            setSubject('')
            setSubject_Description('')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    const addprojectTeam = (e) => {
        e.preventDefault()
            Axios.post(`http://localhost:3001/api/employee-project/add`, {
                Employee_ID: Project_Team,
                Project_ID: project_id,
            })
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <section>
            <div  className='projectdetails'>
                <div className="projectdetails__row">
                    <div className="projectdetails__image">
                        <img src="/assets/images/logo-minimal-md.png" alt=""/>
                    </div>
                    <div className="projectdetails__detail">
                        <p className='projectdetails__id'>Project_Id: {Project.Project_Id}</p>
                        <p className='projectdetails__title'>{Project.Project_Name} (Status:  )</p>
                        <div className="projectdetails__engineers">
                            
                            <p  className='projectdetails__info'> {Project.Project_Description}   elementum pulvinar etiam non quam lacus suspendisse faucibus
                            interdum posuere lorem ipsum dolor sit amet consectetur adipiscing 
                            elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi
                            nullam vehicula ipsum a arcu cursus vitae congue mauris rhoncus
                            aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque
                            tant morbi tristique senectus et</p>
                        </div>
                    </div>
                </div>
                <Link to='/projects'><button className='projectdetails__button'>Retour</button></Link>
            </div>
            <div className="projectdetails__details">
                <div className='first_column'>
                    <div>
                        <h2 className='heading'>{overdue()}</h2>  
                        <ProgressBar
                            progress={60}
                            radius={80}
                            strokeColor="rgb(2, 137, 2)"
                            trackStrokeWidth={8}
                            strokeWidth={8}
                        />
                        <div>
                            <div  className="indicator">{60}%</div>
                            <p className='indicator_paragraph'> Percentage Complete</p>
                        </div>
                    </div>
                    <div>
                        <h4><GroupIcon />&nbsp;Membres de l'équipe</h4>
                        {Engineers.length > 1 && 
                            Engineers.map(engineer => (
                                <p><CheckIcon /> {engineer} </p>
                            ))
                        }
                        {Engineers.length < 1 && 
                            <p> Une équipe n'a pas encore été affectée à ce projet </p>
                        }
                        {account_type === 'Employee' && 
                        <Accordion className='addTeam'>
                            <Card>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                   <PlaylistAddIcon /> Ajouter un membre de l'équipe
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <form className='card__form'>
                                        <label>Ajouter des ingénieurs</label>
                                        <select multiple size='5' onChange={getSelectedValues} >
                                            <option> -- Default -- </option>
                                            {Employees.map(employees => (
                                                <option
                                                    value = {employees.id}
                                                >{employees.Employee_Name}</option>
                                            ))}
                                        </select>
                                        <button className='progress__button' onClick={addprojectTeam}>sauvegarder</button>
                                    </form>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        }
                    </div>
                    <div className='accordion'>
                        <Accordion>
                        {account_type === 'Employee' && 
                            <Card>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                   <PlaylistAddIcon /> Ajouter le déroulement du projet
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <form className='card__form'>
                                        <label>Ajouter un titre</label>
                                        <input type="text" onChange={(event) => {
                                            setProgress_Title(event.target.value)}}/>
                                        <label>La description</label>
                                        <textarea cols="25" rows="5" onChange={(event) => {
                                            setProgress(event.target.value)}}></textarea>
                                        <button className='progress__button' onClick={addProgress}>Sauvegarder</button>
                                    </form>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        }
                            <Card>
                                <Accordion.Toggle className='accordion_header' as={Card.Header} eventKey="1">
                                <ExpandMoreIcon />Données de progress
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    {Project_progress.length < 1 &&
                                        <div className='progress_data'>
                                            <ul>
                                                <li>Désolé, rien à afficher pour le moment</li>
                                            </ul>
                                        </div> 
                                    }

                                    {Project_progress.length > 1 &&
                                    <ul>
                                        {Project_progress.map(data => (
                                            <div className='progress_data'>
                                                <h5> <CheckCircleOutlineIcon /> {data.Progress_Title}</h5>
                                                <li> {data.Progress}</li>
                                            </div>
                                        ))}
                                    </ul>
                                    }
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>
                <div className='second_column'>
                    <h2 className='message_heading'>Vos réflexions sur le projet</h2>
                    <form className='updateProject__form'>
                        <label><SubjectIcon /> le sujet</label>
                        <input type="text" onChange={(event) => {
                            setSubject(event.target.value)}}/>

                        <label><CommentIcon /> Votre message </label>
                        <textarea cols="30" rows="5" type="text" onChange={(event) => {
                            setSubject_Description(event.target.value)}}>
                        </textarea>
                        <button onClick={submitForm} className='newProgress' type='submit'>Soumettre</button>
                    </form>
                </div>
            </div>
            { account_type === 'Employee' && 
                <UpdateProject
                    project_id = {project_id}
                    Project_Name = {project.Project_Name}
                    Project_Type = {project.Project_Type}
                    Project_SubType = {project.Project_SubType}
                    Project_Description = {project.Project_Description}
                    Project_Author = {project.Project_Author}
                    StartDate = {project.StartDate}
                    EndDate = {project.EndDate}
                />
            }
        </section>
    )
}

export default ProjectDetails