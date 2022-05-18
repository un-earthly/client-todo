import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import auth from '../firebase.init'
import Todo from './Todo'

export default function Todos() {
    const [todos, setTodos] = useState([])
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        axios.get(`http://localhost/todo?user=${user.email}`)
            .then(res => setTodos(res.data))
    }, [user, todos])


    return (
        <div className='p-5'>
            <Helmet>
                <title>TODO - Manage Your todos</title>
            </Helmet>

            <h1 className='text-center text-info'>Your TODOS</h1>


            <table class="table">
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
                        todos.map((todo, i) => <Todo todo={todo} taskCompleted={todo?.completed} i={i} />)
                    }
                </tbody>
            </table>

            <Link className='text-center text-info d-flex align-items-center justify-content-center nav-link mt-5' to='/add-todos'>Lets Add Some Todos <i className="bi bi-plus fs-3"></i></Link>


        </div>
    )
}
