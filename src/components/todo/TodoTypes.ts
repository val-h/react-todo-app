export interface TodoType {
  content: string;
  id: number;
  due: string;
  done: boolean;
}

export interface TodoItemProps {
  todo: TodoType;
  updateTodo: (todoId: number, status: boolean) => void;
  getTodos: () => void;
}

export interface TodoListProps {
  todos: TodoType[];
  getTodos: () => void;
}

export interface AddTodoModalProps {
  onClose: () => void;
  getTodos: () => void;
}
