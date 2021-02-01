import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import EmployeeTable from './EmployeeTable'
import './Employees.css'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { useHistory } from 'react-router-dom';

function Employees() {

  const [Employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  let history = useHistory();

  const getEmployees = () => {
    Axios.get(`http://localhost:3001/api/employees`)
    .then((response) => {
        setEmployees(response.data)
    })
    .catch(err => {
        console.log(err)
    })
  }
  function search(rows) {
    return rows.filter(
      (row) => 
            row.Employee_Name.toString().toLowerCase().indexOf(query.toLowerCase()) > -1 ||
            row.Employee_Email.toString().toLowerCase().indexOf(query.toLowerCase()) > -1 ||
            row.Employee_Phone.toString().toLowerCase().indexOf(query.toLowerCase()) > -1 
    )
  }

  const Register = () => {
    history.push('/register')
  }

  useEffect (() => {
    getEmployees()
  }, [])
  return (
    <div className='employee'>
    { Employees.length > 0 &&
      <div>
        <label className='label'>Rechercher dans la table des employés: </label>
        <input type="text" placeholder='search' value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={Register} className='newAccount'>Add Employee</button>
        <EmployeeTable employees = {search(Employees)}/>
      </div>
      }
      {
        Employees.length < 0 &&
        <div className='no__info'>
          <h2 className='heading__message'>Désolé, il n'y a aucun employé dans la base de données</h2>
          <div className='icon'><SentimentVeryDissatisfiedIcon className='sad__icon' /></div>
        </div>
      }
    </div>
  )
}

export default Employees
