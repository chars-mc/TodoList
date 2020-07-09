import './main.scss';
import './static/icon.png';

import { UI } from './js/UI';
import { Task } from './js/Task';
import { Validation } from './js/Validation';

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

   const errors = validateTask(newTask);

   if(errors.length > 0) {
      return printErrors(errors);
   }
   
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
      <span class="${task.color}">
         <input type="checkbox" class="taskDone" ${task.completed? 'checked':''}>
      </span>

      <div class="task-content">
      <p class="task-content__date">${task.date}</p>
         <h4 class="task-content__title ${task.completed? 'done':''}">${task.task}</h4>
      </div>

      <button class="task__delete-button">x</button>`;

   div.querySelector('.task__delete-button').addEventListener('click', () => deleteTask(task.id, div));
   div.querySelector('.taskDone').addEventListener('click', (e) => {
      div.querySelector('.task-content__title').classList.toggle('done');
      e.target.checked? task.completed = true : task.completed = false;
      completeTask(task);
   });
   
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

function validateTask(task) {
   const validation = new Validation();
   let errors = [];

   if(validation.checkEmptyString(task.task)) errors.push('Enter a valid task');
   if(!validation.checkLength(task.task, 3)) errors.push('The task is very short');
   if(!validation.checkDate(new Date(task.date), new Date())) errors.push('The date must be greater than now');

   return errors;
}

function printErrors(errors) {
   const fragment = document.createDocumentFragment();
   errors.forEach(error => {
      const paragraph = document.createElement('p');
      paragraph.innerHTML += ` - ${error}`;
      fragment.appendChild(paragraph);
   });
   
   document.getElementById('errors').innerText = '';
   document.getElementById('errors').appendChild(fragment);
   document.getElementById('errors').classList.add('show');
   
   setTimeout(() => {
      document.getElementById('errors').classList.remove('show');
   }, errors.length * 1800);
}

function completeTask(taskUpdate) {
   const id = tasks.indexOf(task => task.id === taskUpdate.id);
   tasks[id] = taskUpdate;
   console.log(tasks);
   ui.completeTask(taskUpdate);
}