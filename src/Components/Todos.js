import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import auth from '../firebase.init'
import Todo from './Todo'

export default function Todos({ searchedTodo }) {
    const [todos, setTodos] = useState([])
    const [user] = useAuthState(auth)

    useEffect(() => {
        axios.get(`https://young-scrubland-42861.herokuapp.com/todo?user=${user.email}`)
            .then(res => setTodos(res.data))
    }, [user, todos])
    const deleteAll = () => {
        axios.delete('http://localhost/todos/completed')
            .then(res => {
                toast.success(`deleted ${res.data.deletedCount} completed todo`)
            })
    }

    return (
        <div className='p-lg-5 p-3'>
            <Helmet>
                <title>TODO - Manage Your todos</title>
            </Helmet>

            {searchedTodo.error ?
                <p className='text-danger'>Not Found Any To Do With the title</p> :
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{searchedTodo.title}</h5>
                        <p class="card-text">{searchedTodo.desc}</p>
                        <p class="card-text">{searchedTodo.completed ? "completed" : "not completed"}</p>
                    </div>
                </div>
            }
            <h1 className='text-center text-info'>YOUR TODOS</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Done</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map((todo, i) => <Todo todo={todo} taskCompleted={todo?.completed} i={i} key={todo._id} />)
                    }
                </tbody>
            </table>



            <div className="d-lg-flex align-items-center justify-content-between mt-5">
                <Link className='text-center text-info d-flex align-items-center justify-content-center nav-link' to='/add-todos'>Lets Add Some Todos <i className="bi bi-plus fs-3"></i></Link>
                <button className='btn btn-outline-danger mx-lg-0 mx-auto d-lg-inline d-block ' onClick={deleteAll}>Delete Completed <i className="bi bi-trash"></i></button>
            </div>

        </div >
    )
}
