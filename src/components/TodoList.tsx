import { useState, useEffect } from 'react'
import type TodoInterface from '../interfaces/TodoInterface'
import Todo from './Todo'
import TodoForm from './TodoForm'
import { SquareLoader } from 'react-spinners';
import './TodoList.css';

const TodoList = () => {
    // states för att hantera todos, felmeddelanden och loading
    const [todos, setTodos] = useState<TodoInterface[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // useEffect för att hämta todos när komponenten mountas
    useEffect(() => {
      fetchTodos();
    }, []);

    // funktion för att hämta todos från API:et
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

    // funktion för att uppdatera status på en todo
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
    
    // funktion för att ta bort en todo
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
    <div className="todo-list">
       {error && <p className='todo-list-error'>{error}</p>}
       {loading && (
        <div className="loader-container">
          <SquareLoader color="#f2d774" size={50} />
        </div>
       )}
        <div className="todo-grid">
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} onDelete={deleteTodo} onStatusChange={updateStatus} />
          ))}
       </div>
    </div>
    <div className="todo-form-container">
      <TodoForm todoUpdated={fetchTodos} />
    </div>
    </>
  )
}

export default TodoList