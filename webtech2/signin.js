	

//index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');	
const taskRoutes = require('./routes/tasks');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());


mongoose.connect('mongodb://localhost:27017');

app.use('/tasks', taskRoutes);


app.options('*', cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//app.js
document.addEventListener('DOMContentLoaded', () => {
  const newTaskForm = document.getElementById('newTaskForm');
  const tasksList = document.getElementById('tasks');
  const loadTasksButton = document.getElementById('loadTasksButton');

  
  newTaskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const taskName = document.getElementById('task_name').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;
    const dueDate = document.getElementById('due_date').value;

   
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task_name: taskName,
          description: description,
          status: status,
          due_date: dueDate,
        }),
      });

      const newTask = await response.json();

      
      const taskItem = document.createElement('li');
      taskItem.textContent = `${newTask.task_name} - ${newTask.description} - ${newTask.status} - ${newTask.due_date}`;
      tasksList.appendChild(taskItem);

      
      newTaskForm.reset();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  });

  
  loadTasksButton.addEventListener('click', async () => {
    try {
      
      const response = await fetch('/api/tasks');
      const tasks = await response.json();

      
      tasksList.innerHTML = '';

      tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.task_name} - ${task.description} - ${task.status} - ${task.due_date}`;
        tasksList.appendChild(taskItem);
      });
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  });
});


