export class UI {
   saveTask(task) {
      localStorage.setItem(task.id, JSON.stringify(task));
   }
   
   getTasks() {
      let tasks = [];
      let i = 0;

      while(localStorage.key(i)) {
         const task = localStorage.getItem(localStorage.key(i));

         try {
            tasks.push(JSON.parse(task));
         } catch(error) {
            console.error(error);
         }

         i++;
      }

      return tasks;
   }
   removeTask(id) {
      localStorage.removeItem(id);
   }
}
