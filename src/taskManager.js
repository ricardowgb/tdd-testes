let currentId = 1;

function resetId() {
  currentId = 1;
}

function createTask(title) {
  return {
    id: currentId++,
    title,
    completed: false
  };
}

function addTask(tasks, title) {
  const task = createTask(title);
  return [...tasks, task];
}

function removeTask(tasks, taskId) {
  return tasks.filter(task => task.id !== taskId);
}

module.exports = { createTask, addTask, removeTask, resetId };