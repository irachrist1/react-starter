// TodoApp.jsx

import React, { useState, useEffect } from 'react';
import './index.css'; // Ensure the correct path to your CSS file

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: prevTasks.length + 1, text: newTask, completed: false },
      ]);
      setNewTask('');
    }
  };

  const completeTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []); // Run once on component mount

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); // Run whenever tasks change

  return (
    <div className="todo-app">
      <h1>Fun Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="todo-list">
        <div className="todo-column">
          <h2>Tasks</h2>
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <div key={task.id} className="todo-task">
                <span>{task.text}</span>
                <div className="task-buttons">
                  <button onClick={() => completeTask(task.id)}>Complete</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
        <div className="todo-column completed">
          <h2>Completed</h2>
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <div key={task.id} className="todo-task completed-task">
                <span>{task.text}</span>
                <div className="task-buttons">
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
