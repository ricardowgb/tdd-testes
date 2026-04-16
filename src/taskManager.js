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
  const task = createTask(title);
  return [...tasks, task];
}

function removeTask(tasks, taskId) {
  return tasks.filter(task => task.id !== taskId);
}

module.exports = { createTask, addTask, removeTask, resetId, filterTasks, countTasks, countCompleted, countPending, validatePriority, filterByPriority };

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