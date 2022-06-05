import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TodoList from "./components/todoList/todoList";
import { v4 as uuidv4 } from "uuid";
import InputField from "./components/input/InputField";
import { Todo } from "./models/models";
import "./App.css";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [todosComplete, setTodosComplete] = useState<Array<Todo>>([]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = todosComplete;
    // Source Logic
    if (source.droppableId === "todoListActive") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "todoListActive") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setTodosComplete(complete);
    setTodos(active);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: uuidv4(), title: todo, isDone: false }]);
    }
    setTodo("");
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container mx-auto py-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl text-center text-white uppercase font-bold">
            TasTify Todo List
          </h1>
          <InputField setTodo={setTodo} todo={todo} handleAdd={handleAdd} />

          <TodoList
            setTodos={setTodos}
            todos={todos}
            todosComplete={todosComplete}
            setTodosComplete={setTodosComplete}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
