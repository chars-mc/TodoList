export class UI {
   saveTask(task) {
      localStorage.setItem(task.id, JSON.stringify(task));
   }
}
