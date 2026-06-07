import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  completeTodo,
  unmarkTodo,
} from "./slices/todoSlice";
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
          status: "added",
        }),
      );
    }
    setInputText("");
  };

  const onDeleteTodoClick = (id) => {
    dispatch(
      deleteTodo({
        id: id,
      }),
    );
  };
  const onCompleteTodoClick = (id) => {
    dispatch(
      completeTodo({
        id: id,
      }),
    );
  };
  const onUnmarkTodoClick = (id) => {
    dispatch(
      unmarkTodo({
        id: id,
      }),
    );
  };
  const countCompleted = () => {
    let count = 0;
    todos.forEach((todo) => {
      if (todo.status === "complete") count++;
    });
    return count;
  };
  return (
    <>
      <div className="min-h-screen pt-24 bg-slate-900
                      text-white flex flex-col overflow-hidden">
        <Navbar />

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row 
                        justify-center gap-3 px-4 w-full max-w-3xl mx-auto">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter a todo..."
            className="
            bg-slate-800 border border-slate-700
            rounded-xl px-4 py-3
            flex-1
            outline-none
            focus:border-blue-500
            transition
          "
          />

          <button
            onClick={onAddTodoClick}
            className="
            px-5 py-3 rounded-xl
            bg-blue-600 hover:bg-blue-500
            transition font-semibold
            w-full sm:w-auto
          "
          >
            Add Todo
          </button>
        </div>
        {/* Todo List */}
        {todos && todos.length > 0 ? (
          <div className="flex justify-center font-black mt-4 mb-4">
            Completed : {countCompleted()}/{todos.length}
          </div>
        ) : (
          <div className="flex justify-end font-black mt-4 mb-4"></div>
        )}
        <div
          className="
        overflow-y-auto
        mt-4
        px-3 sm:px-6
        pb-6
        h-[calc(100vh-220px)]
        
        w-full
        sm:w-[90%]
        md:w-[75%]
        lg:w-1/2
        
        mx-auto
        "
        >
          <div className="space-y-4">
            {todos && todos.length > 0 ? (
              todos.map(({ id, todo, status }) => (
                <div
                  key={id}
                  className="
                bg-slate-800
                border border-slate-700
                rounded-2xl
                p-4 sm:p-5
                shadow-xl shadow-black/20
                hover:border-slate-500
                transition-all
                "
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <h2
                      className={`
                    text-lg sm:text-xl
                    font-semibold
                    break-all
                    ${status === "complete" ? "line-through" : ""}
                  `}
                    >
                      {todo}
                    </h2>

                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      {status !== "complete" ? (
                        <button
                          onClick={() => onCompleteTodoClick(id)}
                          className="
                        px-4 py-2
                        rounded-xl
                        bg-green-300/20
                        hover:bg-green-500/30
                        transition
                        min-w-[110px]
                        "
                        >
                          Mark
                        </button>
                      ) : (
                        <button
                          onClick={() => onUnmarkTodoClick(id)}
                          className="
                        px-4 py-2
                        rounded-xl
                        bg-green-300/20
                        hover:bg-green-500/30
                        transition
                        min-w-[110px]
                        "
                        >
                          Unmark
                        </button>
                      )}

                      <button
                        onClick={() => onDeleteTodoClick(id)}
                        className="
                      px-4 py-2
                      rounded-xl
                      bg-red-500/20
                      text-red-400
                      hover:bg-red-500/30
                      transition
                      "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center font-black text-2xl">No Todos !!</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
