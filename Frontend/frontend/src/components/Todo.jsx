import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '@govtechsg/sgds-react'
import CONFIG from '../config'
import TodoItem from './TodoItem'
import checkIcon from '../icons/check.svg'
import TodoHeader from './TodoHeader'

// Parent component
const Todo = () => {
  const [todoItems, setTodoItems] = useState({})
  const [newTodoDescription, setNewTodoDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false) // Add a new state to track button disable state

  useEffect(() => {
    populateTodos()
  }, [])

  useEffect(() => { // Add a new useEffect hook
    if (newTodoDescription.trim().length > 30) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [newTodoDescription]) // Run this effect whenever newTodoDescription changes

  const populateTodos = async () => {
    const result = await axios.get(`${CONFIG.API_ENDPOINT}/todos`)
    console.log(result)
    setTodoItems(result.data)
  }

  const submitNewTodo = async () => {
    setIsLoading(false)
    if (newTodoDescription.trim() !== '') {
        const newTodo = {
          description: newTodoDescription,
        }
        try {
          await axios.post(`${CONFIG.API_ENDPOINT}/todos`, newTodo)
          await populateTodos()
          setNewTodoDescription('')
        } catch (error) {
          console.error('Error posting new todo:', error)
        }
    } else {
      alert('Invalid Todo input!')
    }
  }

  /* to show "saving..."
  const submitNewTodo = async () => {
    setIsLoading(true); // Set isLoading to true to show the "Saving..." text
    setTimeout(async () => { // Add a setTimeout to simulate a loading state for 2 seconds
      if (newTodoDescription.trim() !== '') {
        if (newTodoDescription.length <= 30) {
          const newTodo = {
            description: newTodoDescription,
          }
          try {
            await axios.post(`${CONFIG.API_ENDPOINT}/todos`, newTodo)
            await populateTodos()
            setNewTodoDescription('')
          } catch (error) {
            console.error('Error posting new todo:', error)
          }
        } else {
          alert('Description should not exceed 30 characters');
        }
      } else {
        alert('Invalid Todo input!')
      }
      setIsLoading(false); // Set isLoading to false after the timeout
    }, 2000); // 2000ms = 2 seconds
  }
  */

  //* Exercise 1B
  const today = new Date()
  const formatDate = (today) => {
    return `${today.toLocaleDateString('en-UK', { weekday: 'long' })}, ${today.toLocaleDateString(
      'en-UK',
      {
        day: 'numeric',
        month: 'long',
      },
    )} 🌤️`
  }

  return (
    <div className="todo-container">
      {/*       <div className="todo-box">
        <div className="todo-div">
          <h1 style={{ padding: '10px 0px' }}>{formatDate(today)}</h1>
          <h2 style={{ paddingBottom: '5px' }}>
            Hey there! What's the plan for today?
          </h2>
        </div>
      </div> */}
      <TodoHeader />
      <div className="input-container">
        <input
          type="checkbox"
          checked={false}
          disabled={true}
          style={{ transform: 'scale(1.5)' }}
        />
        <input
          type="text"
          style={{ flexGrow: 1, width: 600, border: 'none' }}
          value={newTodoDescription}
          onChange={(e) => {
            setNewTodoDescription(e.target.value)
          }}
          placeholder="✏️ Have a new to-do? Write it down! "
        />
        <Button
          onClick={submitNewTodo}
          disabled={isLoading || isDisabled} // Disable the button if isLoading or isDisabled is true
          className="save-button"
        >
          {isLoading ? (
            'Saving...'
          ) : (
            <>
              <img src={checkIcon} alt="Check" style={{ width: '16px' }} />
              <span style={{ whiteSpace: 'nowrap' }}>Save Task</span>
            </>
          )}
        </Button>
      </div>
      <div className="todo-items-container">
        {Object.values(todoItems).map((todo) => (
          <div style={{ marginBottom: '25px' }}>
            <TodoItem
              key={todo.id}
              id={todo.id}
              description={todo.description}
              completed={todo.completed}
              refreshToDos={populateTodos}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo