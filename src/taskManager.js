let currentId = 1;

function resetId() {
  currentId = 1;
}

function createTask(title, priority = 'medium') {
  return {
    id: currentId++,
    title,
    completed: false,
    priority
  };
}

function addTask(tasks, title) {
  if (isDuplicate(tasks, title)) {
    throw new Error('Já existe uma tarefa com esse título');
  }
  const task = createTask(title);
  return [...tasks, task];
}

function removeTask(tasks, taskId) {
  return tasks.filter(task => task.id !== taskId);
}

function isDuplicate(tasks, title) {
  const normalizado = title.trim().toLowerCase();
  return tasks.some(task => task.title.trim().toLowerCase() === normalizado);
}

function sortTasks(tasks) {
  const pendentes = tasks.filter(task => task.completed === false);
  const concluidas = tasks.filter(task => task.completed === true);
  return [...pendentes, ...concluidas];
}
function searchTasks(tasks, query) {
  if (query === '') return [...tasks];
  return tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));
}



module.exports = { createTask, addTask, removeTask, resetId, filterTasks, countTasks, countCompleted, countPending, validatePriority, filterByPriority, isDuplicate, sortTasks, searchTasks };

function filterTasks(tasks, status) {
  switch (status) {
    case 'completed':
      return tasks.filter(task => task.completed === true);
    case 'pending':
      return tasks.filter(task => task.completed === false);
    default:
      return [...tasks];
  }
}

function countTasks(tasks) {
  return tasks.length;
}

function countCompleted(tasks) {
  return tasks.filter(task => task.completed === true).length;
}

function countPending(tasks) {
  return tasks.filter(task => task.completed === false).length;
}
function validatePriority(priority) {
  return ['low', 'medium', 'high'].includes(priority);
}

function filterByPriority(tasks, priority) {
  return tasks.filter(task => task.priority === priority);
}