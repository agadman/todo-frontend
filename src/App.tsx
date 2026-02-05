import './App.css'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {

  return (
    <>
      <Header />    
      <TodoList />
      <TodoForm />
    </>
  )
}

export default App