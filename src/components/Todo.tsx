import type TodoInterface from "../interfaces/TodoInterface"

const Todo = ({todo}: {todo: TodoInterface}) => {

  const statusColor = todo.status === "ej påbörjad" ? "red" : todo.status === "Pågående" ? "orange" : "green";
  
  return (
    <section>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <p style={{ color: statusColor }}>Status: {todo.status}</p>
      <p>{todo.createdAt.toLocaleString()}</p>
    </section>
  )
}

export default Todo