import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function UpdateTodo() {
    const { id } = useParams();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()
    const onSubmit = data => {
        const todoData = {
            title: data.title,
            desc: data.desc,
            comment: data.comment,
        }
        axios.put(`https://young-scrubland-42861.herokuapp.com/todo/${id}`, todoData)
            .then(res => res.data.acknowledged ? (toast.success('Successfully updated a todo'), navigate('/todos')) : toast.error('failed to update'))
    };
    return (
        <div className="container-sm">
            <h6 className="text-center text-info my-4">Have something Update with work.Lets modify {id}</h6>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-floating">
                    <input type="text" className="form-control" id="title" placeholder="Todo title" {...register("title")} />
                    <label htmlFor="title">What To Do?</label>
                </div>
                <div className="form-floating my-3">
                    <textarea type="text" className="form-control" rows="10" id="msg" placeholder="Todo Description" {...register("desc")} />
                    <label htmlFor="msg">Description</label>
                </div>
                <div className="form-floating">
                    <textarea type="text" className="form-control" rows="10" id="comment" placeholder="Todo Description" {...register("comment")} required />
                    <label htmlFor="comment">Comment</label>
                </div>
                <button className="btn btn-outline-dark w-100 mt-4">Submit</button>
            </form>

        </div>
    )
}
