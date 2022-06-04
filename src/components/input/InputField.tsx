import React, { FormEvent } from "react";

interface InputFieldProps {
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  todo: string;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  setTodo,
  todo,
  handleAdd,
}) => {
  return (
    <form className="w-80 relative mx-auto" onSubmit={handleAdd}>
      <input
        className="outline-none w-full text-lg border-2 rounded-sm  border-cyan-300 px-2 py-3 focus:border-cyan-500"
        type="text"
        name="fiels"
        id="fiels"
        placeholder="Enter your Task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="h-full p-5 flex items-center justify-center bg-blue-500 absolute right-0 top-0"
      >
        <span className="text-white">Add</span>
      </button>
    </form>
  );
};

export default InputField;
