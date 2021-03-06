import React from 'react'
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Social from './Social';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [updateProfile] = useUpdateProfile(auth);
    const [createUserWithEmailAndPassword, user, , error] = useCreateUserWithEmailAndPassword(auth)
    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.name });
        toast.success('Registed successfully')
    };
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname
    if (user) {
        navigate(from || '/add-todos')
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-50 w-sm-100 mx-auto my-5 shadow-sm p-5 rounded'>
            <h1 className="text-info text-center">Register</h1>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" {...register("name", {
                    required: 'name is required'
                })} />
                {errors?.name && console.log(errors)}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" {...register("email", {
                    required: 'email is required'
                })} />
                {errors?.email && console.log(errors)}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password"  {...register("password", {

                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                        message: 'A valid password is at least 6 chars long, has at least one uppercase and one lowercase character.'
                    }
                })} />

                {errors?.password && console.log(errors)}

            </div>

            {error && <p className='text-danger'>{error.message}</p>}
            <button type="submit" className="btn btn-dark w-100">Submit</button>
            <Social />
        </form>
    )
}
