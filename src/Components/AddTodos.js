import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Loading from './Loading';

export default function AddTodos() {
    const { register, handleSubmit } = useForm();
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
    const onSubmit = data => {
        const todoData = {
            email: user.email,
            title: data.title,
            desc: data.desc
        }

        axios.post('https://young-scrubland-42861.herokuapp.com/todo', todoData)
            .then(res => {
                res.data.acknowledged ? toast.success('Successfully added a todo') : toast.error('failed to insert')
                navigate('/todos')
            })
    };
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-50 mx-auto'>
            <h1 className="text-center text-info my-4">Have something to do.Insert it up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='my-5 '>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="title" placeholder="Todo title" {...register("title")} required />
                    <label for="title">What To Do?</label>
                </div>
                <div class="form-floating">
                    <textarea type="text" class="form-control" id="msg" placeholder="Todo Description" {...register("desc")} required />
                    <label for="msg">Description</label>
                </div>
                <button className="btn btn-outline-dark w-100 mt-4">Submit</button>
            </form>

        </div>
    )
}
