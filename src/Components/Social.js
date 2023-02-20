import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';

export default function Social() {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate()
    if (user) {
        navigate("/todos")
    }
    if (error) {
        toast.error(error.message)
    }
    return (
        <div className='mt-4'>
            <div className="d-flex justify-content-center align-items-center">


                <p> OR</p>

            </div>


            <button className="btn btn-outline-dark w-100" onClick={() => signInWithGoogle()}>
                {!loading ? "Google" : "Please Wait..."}
            </button>
        </div>
    )
}
