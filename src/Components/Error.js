import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <div style={{ height: '80vh' }} className="d-flex flex-column align-items-center justify-content-center">
            <h1 className='text-danger'>
                Oops!</h1>
            <h2 className='text-danger'>
                404 Not Found</h2>
            <div className="error-details">
                Sorry, Couldnt Find What You Were Looking For
            </div>
            <div className="error-actions">
                <Link to='/' className="btn btn-info btn-lg mt-3"><i className="bi bi-home"></i>
                    Take Me Home </Link>
            </div>
        </div>
    )
}
