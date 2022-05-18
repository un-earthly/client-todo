import React from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Social from './Social';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)
    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
        toast.success('Logged In')
    };

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname
    if (user) {
        if (user) {
            navigate(from || '/add-todos')
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-50 mx-auto my-5 shadow-sm p-5 rounded'>
            <h1 className="text-info text-center">Login</h1>

            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" {...register("email", {
                    required: 'email is required'
                })} />
                {errors?.email && console.log(errors)}
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password"  {...register("password", {
                    pattern: {
                        value: /[A-Za-z]{3}/,
                        message: 'password is required'
                    }
                })} />

                {errors?.password && console.log(errors)}

            </div>
            {error && <p className='text-danger'>{error.message}</p>}
            <button type="submit" class="btn btn-dark w-100">Submit</button>

            <Social />

        </form>
    )
}
