import { useState, useEffect } from 'react'
import type TodoInterface from '../interfaces/TodoInterface'
import Todo from './Todo'

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
 
  return (
    <div>
       <h2>TodoList</h2> 
       {error && <p>{error}</p>}
       {loading && <p>Loading...</p>}

       {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
       ))}
    </div>
  )
}

export default TodoList