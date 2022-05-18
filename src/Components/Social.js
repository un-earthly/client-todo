import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

export default function Social() {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
        <div className='mt-4'>
            <div className="d-flex justify-content-center align-items-center">


                <p> OR</p>

            </div>


            <button class="btn btn-outline-dark w-100" onClick={() => signInWithGoogle()}>
                signInWithGoogle
            </button>
        </div>
    )
}
