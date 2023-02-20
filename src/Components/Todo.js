import axios from 'axios';
// import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import { BASE_URL } from '../urls';
export default function Todo({ todo, i, taskCompleted, setTodoInfo }) {
    const { _id, title, desc, comment } = todo;
    const deleteTodo = id => {
        const confirm = window.confirm('Are You Sure?')

        if (confirm) {
            axios.delete(`${BASE_URL}/todo/${id}`)
                .then(res => console.log(res))
        }
        else {
            toast.error('Coudnt delete.Permission not given')
        }
    }
    const makestyleDased = id => {
        axios.put(`${BASE_URL}/todo/${id}/completed`)
            .then(res => console.log(res.data))
    }
    return (
        <>
            <tr key={_id}>
                <th scope="row">{i + 1}</th>
                <td className={`${taskCompleted ? 'text-decoration-line-through text-danger disabled' : ''}`}>{title}</td>
                <td className={`${taskCompleted ? 'text-decoration-line-through text-danger disabled' : ''}`}>{desc}</td>
                <td className={`${taskCompleted ? 'text-decoration-line-through text-danger disabled' : ''}`}>{comment}</td>
                <td><button disabled={taskCompleted} className={taskCompleted ? "btn btn-success" : "btn btn-danger"} onClick={() => makestyleDased(_id)}><i className={`bi ${taskCompleted ? "bi-check2-circle" : "bi-x-lg"}`}></i></button></td>

                <td><button className="btn btn-info"><Link to={`/update-todo/${_id}`}><i className="bi bi-pencil text-white"></i></Link></button></td>
                <td><button className="btn btn-danger" onClick={() => deleteTodo(_id)}><i className="bi bi-trash"></i></button></td>
            </tr >

        </>
    )
}
