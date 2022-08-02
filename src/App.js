import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Todos from './Components/Todos';
import Login from './Components/Login';
import Register from './Components/Register.js';
import RequireAuth from './Components/RequireAuth';
import Error from './Components/Error';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import AddTodos from './Components/AddTodos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import UpdateTodo from './Components/UpdateTodo';
function App() {

  const [searchedTodo, setSearchTodo] = useState(null)
  return (
    <div className="App">
      <Navbar setSearchTodo={setSearchTodo} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<RequireAuth><Todos searchedTodo={searchedTodo} /></RequireAuth>} />
        <Route path="/add-todos" element={<RequireAuth><AddTodos /></RequireAuth>} />
        <Route path="/update-todo/:id" element={<RequireAuth><UpdateTodo /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
