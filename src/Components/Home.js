import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='d-flex align-items-center justify-content-center container'>
            <Helmet>
                <title>TODO-A Beautiful way to organize your workflow</title>
            </Helmet>
            <div>

                <h1 style={{ fontSize: '80px', }} className='text-info'>Your Task Mangament Buddy!!</h1>
                <p className='text-semibold'>Sit Relax! Work! let us manage Your schedule.</p>
                <Link to='/register' className="btn btn-dark me-3 btn-lg ">Get Started!</Link>
                <Link to='/login' className="btn btn-outline-dark btn-lg">Login.</Link>

            </div>

            <img style={{ width: '50%' }} src="https://img.freepik.com/free-vector/watercolor-tube-schedule-list-vector-cartoon-character_193274-48634.jpg?w=740" alt="" />

        </div >
    )
}
