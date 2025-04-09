import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoAddOutline } from "react-icons/io5";

import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";

const ToDoForm = () => {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState([
    // { id: 1, text: "Buy groceries", isCompleted: false },
    // { id: 2, text: "Finish React project", isCompleted: true },
    // { id: 3, text: "Call mom", isCompleted: false },
  ]);

  const resetText = () => {
    setTodoText("");
  };

  const newTodo = {
    id: Date.now(),
    text: todoText,
    isCompleted: false,
  };

  const addTodo = () => {
    if (todoText.trim() === "") return;
    setTodoList((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto gap-4 justify-center py-8 px-4 ">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-blue-900 font-sans">
          ToDo Application
        </h1>
      </div>

      <div className="w-full flex gap-3 mt-6">
        <input
          type="text"
          placeholder="Enter your task..."
          onChange={(event) => setTodoText(event.target.value)}
          value={todoText}
          className="border border-blue-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 rounded-md px-3 py-2 w-full shadow-sm"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-6 py-2 shadow-md transition cursor-pointer flex gap-1 items-center"
          onClick={() => {
            addTodo();
            resetText();
          }}
        >
          <IoAddOutline /> Add
        </button>
      </div>

      <ul className="flex flex-col gap-2 mt-4">
        {todoList.map((todo) => (
          <li
            id={`todo-${todo.id}`}
            className={`flex justify-between items-center gap-4 px-4 py-3 rounded-md shadow-sm transition ${
              todo.isCompleted
                ? "bg-slate-200 text-slate-400 line-through"
                : "bg-white text-gray-800 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => toggleCompleted(todo.id)}
                className="accent-green-500"
              />
              <p className="text-base">{todo.text}</p>
            </div>

            <div className="action-btns flex gap-2">
              <button
                className="border border-blue-400 bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium cursor-pointer px-2 py-1 rounded shadow-sm transition"
                title="Edit"
              >
                <FaRegEdit />
              </button>

              <button
                className="border border-red-400 bg-red-100 text-red-700 hover:bg-red-200 font-medium cursor-pointer px-2 py-1 rounded shadow-sm transition"
                title="Delete"
                onClick={() => {
                  if (confirm("Are you sure to delete?")) {
                    deleteTodo(todo.id);
                    setTimeout(() => {
                      alert("ToDo deleted successfully.");
                    }, 500);
                  } else {
                    setTimeout(() => {
                      alert("Operation canceled.");
                    }, 500);
                  }
                }}
              >
                <FaTrashCan />
              </button>

              <button
                className={`border px-2 py-1 rounded shadow-sm font-medium cursor-pointer transition ${
                  todo.isCompleted
                    ? "border-green-400 bg-green-100 text-green-700 hover:bg-green-200"
                    : "border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => toggleCompleted(todo.id)}
                title={
                  todo.isCompleted ? "Mark as Incomplete" : "Mark as Complete"
                }
              >
                {todo.isCompleted ? (
                  <IoCheckmarkCircle />
                ) : (
                  <IoCheckmarkCircleOutline />
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ToDoForm;
