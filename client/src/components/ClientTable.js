import Axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import './Client.css'

function ClientTable({clients}) {

    const columns = clients[0] && Object.keys(clients[0])
    return (
        <table cellPadding={10} cellSpacing={10}>
            <thead className='thead'>
                <tr>{clients[0] && columns.slice(0, 6).map((heading) => <th>{heading}</th>)} Action </tr>
            </thead>
            <tbody>
                {clients.map((row) => 
                    <tr>
                        {columns.slice(0, 6).map(column => <td>{row[column]}</td>)} <Link> Edit </Link> &nbsp;&nbsp;<Link> Delete </Link>
                        
                    </tr> )
                }
            </tbody>
        </table>
    )
}

export default ClientTable
