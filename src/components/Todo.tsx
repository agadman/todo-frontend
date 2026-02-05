import type TodoInterface from "../interfaces/TodoInterface";

type Props = {
  todo: TodoInterface;
  onDelete: (id: number) => void;
};

const Todo = ({ todo, onDelete }: Props) => {
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
      <p style={{ color: statusColor }}>Status: {todo.status}</p>
      <p>{new Date(todo.createdAt).toLocaleString()}</p>

      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </section>
  );
};

export default Todo;