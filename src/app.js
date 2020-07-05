import './main.scss';
import './static/icon.png';

import { UI } from './js/UI';
import { Task } from './js/Task';


const ui = new UI();

window.addEventListener('load', () => {
   document.getElementById('taskForm').addEventListener('submit', e => saveTask(e));

});

function saveTask(e) {
   e.preventDefault();

   const title = e.target.taskTitle.value;
   const color = e.target.taskColor.value;
   const date = new Date(e.target.taskDate.value);
   const id = `${date.getTime()}_${title.charCodeAt(1)}_${color.charCodeAt(1)}_${Math.random()}`;

   const newTask = new Task(id, title, color, date.toLocaleString());

   ui.saveTask(newTask);
   e.target.reset();
}