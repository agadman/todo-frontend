import type TodoInterface from "../interfaces/TodoInterface";

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
    <section>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <select
          value={todo.status}
          onChange={(e) => onStatusChange(todo.id, e.target.value)}
          style={{
          border: `2px solid ${statusColor}`,
          borderRadius: "6px",
          padding: "4px 8px"
        }}
        >
          <option>ej påbörjad</option>
          <option>pågående</option>
          <option>avklarad</option>
        </select>
      <p>{new Date(todo.createdAt).toLocaleString()}</p>

      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </section>
  );
};

export default Todo;