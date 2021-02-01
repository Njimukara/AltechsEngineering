import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import ClientTable from './ClientTable'
import './Client.css'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { useHistory } from 'react-router-dom';

function Clients() {

  const [Client, setClients] = useState([]);
  const [q, setQ] = useState("");
  let history = useHistory();

  const getClients = () => {
    Axios.get(`http://localhost:3001/api/clients`)
    .then((response) => {
        setClients(response.data)
    })
    .catch(err => {
        console.log(err)
    })
  }
  function search(rows) {
    return rows.filter(
      (row) => 
            row.Client_Name.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.Client_Email.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            row.Client_Phone.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 
    )
  }
  const Register = () => {
    history.push('/register')
  }

  useEffect (() => {
    getClients()
  }, [])
  return (
    <div className='client'>
    { Client.length > 0 &&
      <div>
        <label className='label'>Rechercher dans la table des clients: </label>
        <input type="text" placeholder='search' value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={Register} className='newAccount'>New Client</button>
        <ClientTable clients = {search(Client)}/>
      </div>
      }
      {
        Client.length < 0 &&
        <div className='no__info'>
          <h2 className='heading__message'>Désolé, il n'y a aucun employé dans la base de données</h2>
          <div className='icon'><SentimentVeryDissatisfiedIcon className='sad__icon' /></div>
        </div>
      }
    </div>
  )
}

export default Clients
