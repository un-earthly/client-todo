import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

export default function Todo({ todo, i, taskCompleted }) {
    const { _id, title, desc } = todo;

    const deleteTodo = id => {
        const confirm = window.confirm('Are You Sure?')

        if (confirm) {
            axios.delete(`https://young-scrubland-42861.herokuapp.com/todo/${id}`)
                .then(res => toast.success('Deleted Sucessfully'))
        }
        else {
            toast.error('Coudnt delete.Permission not given')
        }
    }
    const makestyleDased = id => {
        axios.put(`https://young-scrubland-42861.herokuapp.com/todo/${id}`)
            .then(res => toast.success('Congrats on completeing the task'))
    }
    return (
        <tr key={_id}>
            <th scope="row">{i + 1}</th>
            <td className={`${taskCompleted ? 'text-decoration-line-through text-danger disabled' : ''}`}>{title}</td>
            <td className={`${taskCompleted ? 'text-decoration-line-through text-danger disabled' : ''}`}>{desc}</td>
            <td><button className="btn btn-success" onClick={() => makestyleDased(_id)}><i className="bi bi-check2-circle"></i></button></td>
            <td><button className="btn btn-danger" onClick={() => deleteTodo(_id)}><i className="bi bi-trash"></i></button></td>
        </tr>
    )
}
