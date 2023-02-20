import axios from 'axios';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import { BASE_URL } from '../urls';
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

        axios.post(`${BASE_URL}/todo`, todoData)
            .then(res => {
                res.data.acknowledged ? toast.success('Successfully added a todo') : toast.error('failed to insert')
                navigate('/todos')
            })
    };
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div className='container-sm'>
            <h6 className="text-center text-info my-4">Have something to do.Insert it up</h6>
            <form onSubmit={handleSubmit(onSubmit)} className='my-5 '>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="title" placeholder="Todo title" {...register("title")} required />
                    <label htmlFor="title">What To Do?</label>
                </div>
                <div className="form-floating">
                    <textarea type="text" className="form-control" id="msg" placeholder="Todo Description" {...register("desc")} required />
                    <label htmlFor="msg">Description</label>
                </div>
                <button className="btn btn-outline-dark w-100 mt-4">Submit</button>
            </form>

        </div>
    )
}
