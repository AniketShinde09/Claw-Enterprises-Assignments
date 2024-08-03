import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/todos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(response.data);
      } catch (err) {
        alert(err.response.data.error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/todos', { title }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos([...todos, response.data]);
      setTitle('');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const handleToggleComplete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const todo = todos.find(todo => todo._id === id);
      const response = await axios.put(`http://localhost:5000/todos/${id}`, {
        ...todo,
        completed: !todo.completed
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const handleDeleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Todos</h2>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => handleToggleComplete(todo._id)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
