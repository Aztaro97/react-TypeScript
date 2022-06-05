import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete, MdDone } from "react-icons/md";
import { Todo } from "../../models/models";
import { Draggable } from "react-beautiful-dnd";

interface SingleTodoProps {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todosComplete: Todo[];
  setTodosComplete: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<SingleTodoProps> = ({
  todo,
  todos,
  setTodos,
  todosComplete,
  setTodosComplete,
  index,
}) => {
  const [edit, setEdit] = useState<Boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleDelete = (id: String) => {
    setTodos([...todos.filter((ele) => ele.id !== id)]);
    setTodosComplete([...todosComplete.filter((ele) => ele.id !== id)]);
  };

  const handleDone = (id: String) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, title: editTodo, isDone: !todo.isDone }
          : todo
      )
    );
    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex justify-between items-center p-4 bg-gray-300 rounded-lg ${
            snapshot.isDragging ? "drop-shadow-md" : ""
          }  `}
          onSubmit={(e) => {
            e.preventDefault();
            handleDone(todo.id);
          }}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="outline-none w-full px-2 py-1 mr-3"
            />
          ) : (
            <p>{todo.title}</p>
          )}

          <div className="flex items-center justify-center gap-1">
            <button
              type="button"
              onClick={() => handleEdit()}
              className="text-xl p-2 hover:scale-150 transition-all"
            >
              <AiFillEdit />
            </button>
            <button
              type="button"
              onClick={() => handleDelete(todo.id)}
              className="text-xl p-2 hover:scale-150 transition-all"
            >
              <MdDelete />
            </button>
            <button
              type="submit"
              className="text-xl p-2 hover:scale-150 transition-all"
            >
              <MdDone />
            </button>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
