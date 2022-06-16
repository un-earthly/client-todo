import { signOut } from 'firebase/auth'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { Link, NavLink } from 'react-router-dom'
import auth from '../firebase.init'
import Loading from './Loading'
import axios from 'axios'
export default function Navbar({ setSearchTodo }) {
  const [user, loading] = useAuthState(auth)
  const { handleSubmit, register } = useForm();
  const onSubmit = data => {
    axios.post('http://localhost/todo/search', data)
      .then(res => (!res.data) ? setSearchTodo({ error: "error" }) : setSearchTodo(res.data))
    // .catch(error => console.log(error))
  }
  if (loading) {
    <Loading />
  }
  const menuIcons = <>
    <li className="nav-item"><NavLink className='nav-link' to='/'>Home</NavLink></li>
    <li className="nav-item"><NavLink className='nav-link' to='/todos'>Todos</NavLink></li>
    <li className="nav-item"><NavLink className='nav-link' to='/add-todos'>Add Todos</NavLink></li>
    <form class="d-flex mx-3 mb-2 mb-lg-0" onSubmit={handleSubmit(onSubmit)} role="search">
      <input {...register("query")} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    {
      user ?
        <>
          <button className='btn btn-outline-danger' onClick={() => signOut(auth)} >Signout</button>
        </>
        :
        <>
          <li className="nav-item"><NavLink className='nav-link' to='/login'>Login</NavLink></li>
          <li className="nav-item"> <NavLink className='nav-link' to='/register'>Register</NavLink></li>
        </>
    }
  </>
  return (
    <div>

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" style={{ fontWeight: 700 }} to="/">TODO</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {menuIcons}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
