import axios from "axios";
import { useEffect, useState } from "react";
import { TodoType } from "../../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const defaultFormData = {
  title: "",
  description: "",
};

const TodoForm = () => {
  const [formData, setFormData] = useState(defaultFormData);

  const { title, description } = formData;

  const [todos, setTodo] = useState([]);

  const fetchdata = async () => {
    await axios.get(`${API_BASE_URL}/`).then((res) => {
      setTodo(res.data);
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    await axios
      .post(`${API_BASE_URL}/`, formData)
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => fetchdata());
    setFormData(defaultFormData);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleClick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const id = { todo_id: event.target.value };
    await axios
      .post(`${API_BASE_URL}/delete`, id)
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => fetchdata());
  };
  return (
    <div className='p-4 text-center'>
      <form onSubmit={onSubmit}>
        <label
          htmlFor='title'
          className='text-gray-700 text-lg font-semibold pr-3'
        >
          Title
        </label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={onChange}
          className='border rounded w-30 py-2 px-3 font-normal mr-4 outline-none'
          placeholder='Title'
        />
        <label
          htmlFor='description'
          className='text-gray-700 text-lg font-semibold pr-3'
        >
          Description
        </label>
        <input
          type='text'
          id='description'
          value={description}
          onChange={onChange}
          className='border rounded w-1/2 py-2 px-3 font-normal mr-4 outline-none'
          placeholder='descriptions....'
        />
        <button type='submit' className='bg-orange-400 text-white p-2 rounded'>
          Add Todo
        </button>
      </form>

      <div className=' bg-orange-50 m-2 w-full grid justify-center'>
        {todos.map((todo: TodoType) => (
          <div
            className='flex m-1 gap-5 alignitems-center w-full text-left'
            key={todo._id}
            id={todo._id}
          >
            <input
              type='checkbox'
              name='checkbox'
              value={todo._id}
              onChange={handleClick}
            />
            <h1 className='font-semibold text-lg capitalize'>{todo.title}</h1>
            <h1 className='font-semibold text-lg'> : </h1>
            <p className='font-medium text-lg capitalize'>{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoForm;
