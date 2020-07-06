import './main.scss';
import './static/icon.png';

import { UI } from './js/UI';
import { Task } from './js/Task';

let tasks = [];
const ui = new UI();

window.addEventListener('load', () => {
   document.getElementById('taskForm').addEventListener('submit', e => saveTask(e));

   tasks = ui.getTasks();  // get tasks from localstorage
   arrayTaskIsEmpty();

   const fragment = document.createDocumentFragment();
   tasks.forEach(task => {
      fragment.appendChild(getTaskTemplate(task));
   });

   document.getElementById('tasks').innerHTML = '';
   document.getElementById('tasks').appendChild(fragment);
});

function saveTask(e) {
   e.preventDefault();

   const title = e.target.taskTitle.value;
   const color = e.target.taskColor.value;
   const date = new Date(e.target.taskDate.value);
   const id = `${date.getTime()}_${title.charCodeAt(1)}_${color.charCodeAt(1)}_${Math.random()}`;

   const newTask = new Task(id, title, color, date.toLocaleString());

   ui.saveTask(newTask);
   tasks.push(newTask);

   e.target.reset();
   
   arrayTaskIsEmpty();
   document.getElementById('tasks').appendChild(getTaskTemplate(newTask));
}

function getTaskTemplate(task) {
   const div = document.createElement('div');
   div.classList = 'task';
   
   div.innerHTML += `
   <span class="${task.color}"></span>
      <div class="task-content">
      <p class="task-content__date">${task.date}</p>
         <h4 class="task-content__title">${task.task}</h4>
      </div>

      <button class="task__delete-button">x</button>`;

   div.querySelector('.task__delete-button').addEventListener('click', () => deleteTask(task.id, div));
   
   return div;
}

function arrayTaskIsEmpty() {
   const titleContainer = document.getElementById('tasks-container__title');

   if(tasks.length === 0) {
      titleContainer.innerText = 'You don´t have tasks yet';
   } else {
      titleContainer.innerText = 'Your tasks';
   }
}

function deleteTask(id, taskElement) {
   const taskID = tasks.findIndex((task) => {
      return task.id === id;
   })

   tasks.splice(taskID, 1)
   taskElement.parentElement.removeChild(taskElement);
   ui.removeTask(id);

   arrayTaskIsEmpty();
}