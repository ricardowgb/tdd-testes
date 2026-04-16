const { createTask, addTask, removeTask, resetId } = require('../src/taskManager');

describe('removeTask', () => {
  let tasks;

  beforeEach(() => {
    resetId();
    tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');
    tasks = addTask(tasks, 'Tarefa 3');
  });

  it('deve remover a tarefa correta pelo ID', () => {
    const result = removeTask(tasks, 1);
    expect(result.find(t => t.id === 1)).toBeUndefined();
  });

  it('deve manter as outras tarefas intactas', () => {
    const result = removeTask(tasks, 1);
    expect(result).toHaveLength(2);
  });

  it('deve retornar um novo array (imutabilidade)', () => {
    const result = removeTask(tasks, 1);
    expect(result).not.toBe(tasks);
  });

  it('deve retornar a lista completa se ID não existir', () => {
    const result = removeTask(tasks, 99);
    expect(result).toHaveLength(3);
  });

  it('deve retornar array vazio se a lista estiver vazia', () => {
    const result = removeTask([], 1);
    expect(result).toHaveLength(0);
  });
});