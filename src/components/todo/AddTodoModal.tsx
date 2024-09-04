import { useState } from "react";
import Button from "../shared/Button";
import { API_URL } from "../../enums";
import { AddTodoModalProps } from "./TodoTypes";

const getFormattedDate = (): string => {
  const date = new Date();
  return date.toISOString().slice(0, 16);
};

const createTodo = async (todo: { content: string; due: string }) => {
  try {
    const res = await fetch(API_URL + `todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

const AddTodoModal = ({ onClose, getTodos }: AddTodoModalProps) => {
  const [content, setContent] = useState("");
  const [date, setDate] = useState<string>(getFormattedDate());
  const [contentError, setContentError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorFlag = false;
    setContentError("");
    if (content.length < 3) {
      setContentError("Content must be at least 3 characters.");
      errorFlag = true;
    }

    if (!errorFlag) {
      const todoData = {
        content,
        due: new Date(date).toISOString(),
      };

      await createTodo(todoData);

      getTodos();
      onClose();
    }
  };
  return (
    <dialog open>
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-element">
          <label>Content</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
            autoFocus
          />
          <div className="error-space">
            {contentError && <span className="error">{contentError}</span>}
          </div>
        </div>

        <div className="form-element">
          <label>Due</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.currentTarget.value)}
          />
        </div>
        <div className="btn-container">
          <Button label="Close" className="btn" onClick={() => onClose()} />
          <Button label="Add" className="btn" type="submit" />
        </div>
      </form>
    </dialog>
  );
};

export default AddTodoModal;
