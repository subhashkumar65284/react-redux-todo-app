import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo,deleteTodo } from "./slices/todoSlice";
import { v4 as uuid } from "uuid";
import Navbar from "./components/navbar";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const onAddTodoClick = () => {
    if (inputText !== "") {
      dispatch(
        addTodo({
          id: uuid(),
          todo: inputText,
        }),
      );
    }
    setInputText("");
  };

  const onDeleteTodoClick = (id) => {
    dispatch(deleteTodo({
      id:id,
    }))
  }
  return (
    <>
      <div className="min-h-screen pt-24 bg-slate-900 text-white flex  flex-col overflow-hidden">
        <Navbar />

        {/* Input Section */}
        <div className="flex justify-center gap-3 px-4">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter a todo..."
            className=" bg-slate-800 border border-slate-700
                      rounded-xl px-4 py-3 w-full max-w-md 
                      outline-none focus:border-blue-500
                      transition"
          />
          <button
            onClick={onAddTodoClick}
            className="px-5 py-3 rounded-xl bg-blue-600
                    hover:bg-blue-500 transition font-semibold
                      whitespace-nowrap"
          >
            Add Todo
          </button>
        </div>

        {/* Todo List */}

        <div
          className=" displayTodos
        overflow-y-auto
        p-8
        mt-4
        mx-auto
        h-[calc(100vh-220px)]
        w-1/2">
          <div className="max-w-2xl mx-auto space-y-4">
            {todos &&
              todos.length > 0 &&
              todos.map(({ id, todo }) => (
                <div
                  key={id}
                  className="
            bg-slate-800
            border border-slate-700
            rounded-2xl
            p-5
            shadow-xl shadow-black/20
            hover:scale-[1.01]
            hover:border-slate-500
            transition-all duration-300
            break-words
            "
                >
                  <div className="flex justify-between items-center gap-4">
                    <h2 className="text-lg sm:text-xl font-semibold break-all">
                      {todo}
                    </h2>

                    <button onClick={() => onDeleteTodoClick(id)}
                      className="
                px-4 py-2
                rounded-xl
                bg-red-500/20
                text-red-400
                hover:bg-red-500/30
                transition
                flex-shrink-0
                "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
