import { signOut } from 'firebase/auth'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, NavLink } from 'react-router-dom'
import auth from '../firebase.init'
import Loading from './Loading'

export default function Navbar() {
  const [user, loading] = useAuthState(auth)
  if (loading) {
    <Loading />
  }
  const menuIcons = <>
    <li class="nav-item"><NavLink className='nav-link' to='/'>Home</NavLink></li>
    <li class="nav-item"><NavLink className='nav-link' to='/todos'>Todos</NavLink></li>
    <li class="nav-item"><NavLink className='nav-link' to='/add-todos'>Add Todos</NavLink></li>
    {
      user ?
        <>
          <button className='btn btn-outline-danger' onClick={() => signOut(auth)} >Signout</button>
        </>
        :
        <>
          <li class="nav-item"><NavLink className='nav-link' to='/login'>Login</NavLink></li>
          <li class="nav-item"> <NavLink className='nav-link' to='/register'>Register</NavLink></li>
        </>
    }
  </>
  return (
    <div>

      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <Link class="navbar-brand" style={{ fontWeight: 700 }} to="/">TODO</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              {menuIcons}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
