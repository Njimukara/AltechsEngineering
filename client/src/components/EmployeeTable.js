import React from 'react'
import './Employees.css'
import { Link } from 'react-router-dom';

function EmployeeTable({employees}) {

    const columns = employees[0] && Object.keys(employees[0])
    return (
        <table cellPadding={10} cellSpacing={10}>
            <thead className='thead'>
                <tr>{employees[0] && columns.slice(0, 2).map((heading) => <th>{heading}</th>)} {employees[0] && columns.slice(3, 7).map((heading) => <th>{heading}</th>)} Action</tr>
            </thead>
            <tbody>
                {employees.map((row) => 
                    <tr>
                        {columns.slice(0, 2).map(column => <td>{row[column]}</td>)}
                        {columns.slice(3, 7).map(column => <td>{row[column]}</td>)}
                        <Link> Edit </Link> &nbsp;&nbsp;<Link> Delete </Link>
                    </tr> )
                }
            </tbody>
        </table>
    )
}

export default EmployeeTable
