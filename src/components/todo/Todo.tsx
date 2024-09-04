import { useState } from "react";
import { TodoItemProps } from "./TodoTypes";
import dayjs from "dayjs";

import "./Todo.css";
import { API_URL } from "../../enums";

const TodoItem = ({ todo, updateTodo, getTodos }: TodoItemProps) => {
  const [status, setStatus] = useState(todo.done);
  const date = dayjs(todo.due.slice(0, 23) + "Z");

  const handleStatusChange = () => {
    setStatus(!status);
    updateTodo(todo.id, !status);
  };

  const deleteTodo = async (todoId: number) => {
    try {
      const res = await fetch(API_URL + `todos/${todoId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data);
      getTodos();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="todo-card">
      <div className="todo-text-container">
        <strong>{todo.content}</strong>
        <span>Due date: {date.format("DD MMM")}</span>
      </div>
      <div className="todo-checkbox-container">
        <input
          type="checkbox"
          checked={status}
          onChange={handleStatusChange}
          className="todo-checkbox"
        />
      </div>
      <div onClick={() => deleteTodo(todo.id)} className="todo-delete">
        X
      </div>
    </div>
  );
};

export default TodoItem;
