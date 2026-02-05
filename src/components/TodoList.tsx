import { useState, useEffect } from 'react'
import type TodoInterface from '../interfaces/TodoInterface'
import Todo from './Todo'
import TodoForm from './TodoForm'

const TodoList = () => {
    const [todos, setTodos] = useState<TodoInterface[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      fetchTodos();
    }, []);

    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://todo-api-8fuh.onrender.com/api/todos');
        
        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        }

      } catch (err) {
        setError('Failed to fetch todos. Try again later.' + err);
      } finally {
        setLoading(false);
      }
    };

    const updateStatus = async (id: number, newStatus: string) => {
  const current = todos.find(t => t.id === id);
  if (!current) return;

  const res = await fetch(
    `https://todo-api-8fuh.onrender.com/api/todos/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: current.title,
        description: current.description,
        status: newStatus,
      }),
    }
  );

  if (!res.ok) throw new Error("Update failed");

  setTodos(prev =>
    prev.map(t =>
      t.id === id ? { ...t, status: newStatus } : t
    )
  );
};

    const deleteTodo = async (id: number) => {
      try {
        setError(null);

        const response = await fetch(
          `https://todo-api-8fuh.onrender.com/api/todos/${id}`,
          { method: "DELETE" }
        );

        if (!response.ok) {
          throw new Error("Delete failed");
        }

        setTodos((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        console.error(err);
        setError("Failed to delete todo. Try again later.");
      }
    };
 
  return (
    <>
    <div>
       <h2>TodoList</h2> 
       {error && <p>{error}</p>}
       {loading && <p>Loading...</p>}

       {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onDelete={deleteTodo} onStatusChange={updateStatus} />
       ))}
    </div>
    <TodoForm todoUpdated={fetchTodos} />
    </>
  )
}

export default TodoList