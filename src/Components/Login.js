import React from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Social from './Social';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signInWithEmailAndPassword, user, , error] = useSignInWithEmailAndPassword(auth)
    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    };

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname
    if (user) {
        if (user) {
            toast.success('Logged In')
            navigate(from || '/add-todos')
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-50 mx-auto my-5 shadow-sm p-5 rounded'>
            <h1 className="text-info text-center">Login</h1>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" {...register("email", {
                    required: 'email is required',
                    pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: 'A valid Email is must.'
                    }
                })} />
                {errors?.email && console.log(errors)}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password"  {...register("password", {
                    required: "Please Enter Your password"
                })} />

                {errors.password && errors.password.message}

            </div>
            {error && <p className='text-danger'>{error.message}</p>}
            <button type="submit" className="btn btn-dark w-100">Submit</button>

            <Social />

        </form>
    )
}
