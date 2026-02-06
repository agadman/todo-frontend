import type TodoInterface from "../interfaces/TodoInterface";
import "./Todo.css";

type Props = {
  todo: TodoInterface;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
};

const Todo = ({ todo, onDelete, onStatusChange }: Props) => {
  const statusColor =
    todo.status === "ej påbörjad"
      ? "red"
      : todo.status === "pågående"
      ? "orange"
      : "green";

  return (
    <section className="todo-note">
      <h2 className="todo-note-title">{todo.title}</h2>
      {todo.description && (
        <p className="todo-note-description">{todo.description}</p>
      )}
      <div className="todo-note-footer">

    <div className="todo-note-row">
      <label className="todo-note-label">
        <select
          className="todo-note-select"
          value={todo.status}
          onChange={(e) => onStatusChange(todo.id, e.target.value)}
          style={{ borderColor: statusColor }}
        >
          <option value="ej påbörjad">ej påbörjad</option>
          <option value="pågående">pågående</option>
          <option value="avklarad">avklarad</option>
        </select>
      </label>
    </div>

    <p className="todo-note-date">
      {new Date(todo.createdAt).toLocaleString()}
    </p>

    <button
      className="todo-note-delete"
      onClick={() => onDelete(todo.id)}
    >
      Delete
    </button>

  </div>
  </section>
);
};

export default Todo;