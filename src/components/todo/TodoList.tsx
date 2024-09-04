import { useEffect } from "react";
import { TodoListProps } from "./TodoTypes";
import { API_URL } from "../../enums";
import Todo from "./Todo";

const TodoList = ({ todos, getTodos }: TodoListProps) => {
  const inProgressTodos = todos.filter((todo) => todo.done === false);
  const completedTodos = todos.filter((todo) => todo.done === true);

  const updateTodo = async (todoId: number, status: boolean) => {
    try {
      const res = await fetch(API_URL + `todos/${todoId}?done=${status}`, {
        method: "PUT",
      });

      const data = await res.json();
      console.log(data);
      getTodos();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="todo-list-wraper">
      <div className="todo-container progress-list">
        <h3>In Progress</h3>
        {inProgressTodos &&
          inProgressTodos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              updateTodo={updateTodo}
              getTodos={getTodos}
            />
          ))}
      </div>
      <div className="todo-container completed-list">
        <h3>Completed</h3>
        {completedTodos &&
          completedTodos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              updateTodo={updateTodo}
              getTodos={getTodos}
            />
          ))}
      </div>
    </div>
  );
};

export default TodoList;
