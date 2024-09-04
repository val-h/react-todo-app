import { useState } from "react";
import "./App.css";
import Button from "./components/shared/Button";
import TodoList from "./components/todo/TodoList";
import AddTodoModal from "./components/todo/AddTodoModal";
import { TodoType } from "./components/todo/TodoTypes";
import { API_URL } from "./enums";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([] as TodoType[]);

  const getTodos = async () => {
    try {
      const res = await fetch(API_URL + "todos");
      if (!res.ok) {
        throw new Error(`Status: ${res.status}`);
      }

      const data: TodoType[] = await res.json();
      setTodos(data);
      console.log("setting todos");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <header className="header">
        <h1>ToDo App</h1>
        <Button
          label="Add Todo"
          className="btn-add"
          onClick={() => setShowModal(true)}
          disabled={showModal === true}
        />
      </header>
      <TodoList todos={todos} getTodos={getTodos} />
      {showModal && (
        <>
          <div className="backdrop"></div>
          <AddTodoModal
            onClose={() => setShowModal(false)}
            getTodos={getTodos}
          />
        </>
      )}
    </>
  );
}

export default App;
