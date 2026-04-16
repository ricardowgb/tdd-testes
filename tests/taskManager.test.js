const { createTask, addTask, removeTask, resetId, filterTasks, countTasks, countCompleted, countPending, validatePriority, filterByPriority, isDuplicate } = require('../src/taskManager');


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

describe('filterTasks', () => {
  let tasks;

  beforeEach(() => {
    resetId();
    tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');
    tasks[0] = { ...tasks[0], completed: true };
  });

  it('deve retornar todas as tarefas com filtro all', () => {
    const result = filterTasks(tasks, 'all');
    expect(result).toHaveLength(2);
  });

  it('deve retornar apenas pendentes com filtro pending', () => {
    const result = filterTasks(tasks, 'pending');
    expect(result).toHaveLength(1);
  });

  it('deve retornar apenas concluídas com filtro completed', () => {
    const result = filterTasks(tasks, 'completed');
    expect(result).toHaveLength(1);
  });

  it('deve retornar todas com filtro desconhecido', () => {
    const result = filterTasks(tasks, 'outro');
    expect(result).toHaveLength(2);
  });

  it('deve retornar array vazio se lista vazia', () => {
    const result = filterTasks([], 'all');
    expect(result).toHaveLength(0);
  });

  it('deve retornar um novo array (imutabilidade)', () => {
    const result = filterTasks(tasks, 'all');
    expect(result).not.toBe(tasks);
  });
});

describe('countTasks', () => {
  beforeEach(() => resetId());

  it('deve retornar 0 para lista vazia', () => {
    expect(countTasks([])).toBe(0);
  });

  it('deve retornar o total de tarefas', () => {
    let tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');
    expect(countTasks(tasks)).toBe(2);
  });
});

describe('countCompleted', () => {
  beforeEach(() => resetId());

  it('deve retornar 0 para lista vazia', () => {
    expect(countCompleted([])).toBe(0);
  });

  it('deve contar apenas tarefas concluídas', () => {
    let tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');
    tasks[0] = { ...tasks[0], completed: true };
    expect(countCompleted(tasks)).toBe(1);
  });

  it('deve retornar 0 quando não há concluídas', () => {
    let tasks = addTask([], 'Tarefa 1');
    expect(countCompleted(tasks)).toBe(0);
  });
});

describe('countPending', () => {
  beforeEach(() => resetId());

  it('deve retornar 0 para lista vazia', () => {
    expect(countPending([])).toBe(0);
  });

  it('deve contar apenas tarefas pendentes', () => {
    let tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');
    tasks[0] = { ...tasks[0], completed: true };
    expect(countPending(tasks)).toBe(1);
  });

  it('deve retornar 0 quando não há pendentes', () => {
    let tasks = addTask([], 'Tarefa 1');
    tasks[0] = { ...tasks[0], completed: true };
    expect(countPending(tasks)).toBe(0);
  });
});
describe('createTask com priority', () => {
  beforeEach(() => resetId());

  it('deve criar tarefa com priority high', () => {
    const task = createTask('Tarefa', 'high');
    expect(task.priority).toBe('high');
  });

  it('deve usar medium como prioridade padrão', () => {
    const task = createTask('Tarefa');
    expect(task.priority).toBe('medium');
  });
});

describe('validatePriority', () => {
  it('deve retornar true para high', () => {
    expect(validatePriority('high')).toBe(true);
  });

  it('deve retornar true para medium', () => {
    expect(validatePriority('medium')).toBe(true);
  });

  it('deve retornar true para low', () => {
    expect(validatePriority('low')).toBe(true);
  });

  it('deve retornar false para valor inválido', () => {
    expect(validatePriority('urgente')).toBe(false);
  });
});

describe('filterByPriority', () => {
  let tasks;

  beforeEach(() => {
    resetId();
    tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');
    tasks[0] = { ...tasks[0], priority: 'high' };
    tasks[1] = { ...tasks[1], priority: 'low' };
  });

  it('deve retornar apenas tarefas de alta prioridade', () => {
    const result = filterByPriority(tasks, 'high');
    expect(result).toHaveLength(1);
    expect(result[0].priority).toBe('high');
  });

  it('deve retornar array vazio se não houver tarefas com essa prioridade', () => {
    const result = filterByPriority(tasks, 'medium');
    expect(result).toHaveLength(0);
  });
});
describe('isDuplicate', () => {
  it('deve retornar true se título já existe', () => {
    const tasks = [{ title: 'Estudar' }];
    expect(isDuplicate(tasks, 'Estudar')).toBe(true);
  });

  it('deve retornar true ignorando maiúsculas e minúsculas', () => {
    const tasks = [{ title: 'Estudar' }];
    expect(isDuplicate(tasks, 'estudar')).toBe(true);
  });

  it('deve retornar true ignorando espaços extras', () => {
    const tasks = [{ title: 'Estudar' }];
    expect(isDuplicate(tasks, '  Estudar  ')).toBe(true);
  });

  it('deve retornar false se título não existe', () => {
    const tasks = [{ title: 'Estudar' }];
    expect(isDuplicate(tasks, 'Trabalhar')).toBe(false);
  });
});

describe('addTask com duplicatas', () => {
  beforeEach(() => resetId());

  it('deve lançar erro ao adicionar tarefa duplicada', () => {
    let tasks = addTask([], 'Estudar');
    expect(() => addTask(tasks, 'Estudar')).toThrow();
  });

  it('deve lançar erro ignorando maiúsculas', () => {
    let tasks = addTask([], 'Estudar');
    expect(() => addTask(tasks, 'estudar')).toThrow();
  });
});