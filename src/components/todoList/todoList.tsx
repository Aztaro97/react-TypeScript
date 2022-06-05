import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../../models/models";
import SingleTodo from "../todo/SingleTodo";

interface props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todosComplete: Todo[];
  setTodosComplete: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  todosComplete,
  setTodosComplete,
}) => {
  return (
    <div className="px-2 flex md:flex-row flex-col items-start justify-center gap-2">
      <Droppable droppableId="todoListActive">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`w-full flex flex-col gap-5 bg-white rounded-lg px-4 py-5 mt-3 ${
              snapshot.isDraggingOver ? "drop-shadow-md" : ""
            }`}
          >
            <h3 className="w-full text-3xl text-center font-bold capitalize">
              Active Tast
            </h3>
            {todos.map((todo, index) => (
              <SingleTodo
                todo={todo}
                key={index}
                index={index}
                setTodos={setTodos}
                todos={todos}
                todosComplete={todosComplete}
                setTodosComplete={setTodosComplete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* *****************    */}
      <Droppable droppableId="todoListComplete">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`w-full flex flex-col gap-5 bg-amber-400 rounded-lg px-4 py-5 mt-3`}
          >
            <h3 className="w-full text-3xl text-center font-bold capitalize">
              Complete Tast
            </h3>
            {todosComplete.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={index}
                setTodos={setTodos}
                todos={todos}
                todosComplete={todosComplete}
                setTodosComplete={setTodosComplete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
