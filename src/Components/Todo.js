import axios from 'axios';
import React, { useState } from 'react'

export default function Todo({ todo, i, taskCompleted }) {
    const { _id, title, desc } = todo;

    const deleteTodo = id => {
        axios.delete(`http://localhost/todo/${id}`)
    }
    const makestyleDased = id => {
        axios.put(`http://localhost/todo/${id}`)
            .then(res => console.log(res.data))
    }
    return (
        <tr key={_id}>
            <th scope="row">{i + 1}</th>
            <td className={`${taskCompleted ? 'text-decoration-line-through text-danger disabled' : ''}`}>{title}</td>
            <td className={`${taskCompleted ? 'text-decoration-line-through text-danger disabled' : ''}`}>{desc}</td>
            <td><button className="btn btn-success" onClick={() => makestyleDased(_id)}><i class="bi bi-check2-circle"></i></button></td>
            <td><button className="btn btn-danger" onClick={() => deleteTodo(_id)}><i class="bi bi-trash"></i></button></td>
        </tr>
    )
}
