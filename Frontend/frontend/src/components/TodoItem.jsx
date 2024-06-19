import { useState } from 'react'
import axios from 'axios'
import CONFIG from '../config'
import crossIcon from '../icons/cross.svg'


// Child
// props: {key, id, description, ...}
function TodoItem(props) {
  const [completed, setCompleted] = useState(props.completed);


  const updateTodoItem = async (newCompleted) => {
    try {
      await axios.put(`${CONFIG.API_ENDPOINT}/todos/${props.id}`, {
        id: props.id,
        description: props.description,
        completed: newCompleted,
      });
      
    } catch (error) {
      console.error('Error updating todo item:', error)
    }
  }

  const toggleCompleted = async () => {
    setCompleted(!completed);
    await updateTodoItem(!completed);
  }

  const deleteTodoItem = async () => {
    try {
      await axios.delete(`${CONFIG.API_ENDPOINT}/todos/${props.id}`);
      props.refreshToDos();
    } catch (error) {
      console.error('Error posting new todo:', error)
    }
  };



  return (
    <>
      <div className="todo-item">
        <input type="checkbox" style={{ transform: 'scale(1.5)' }} onChange={toggleCompleted} checked={completed}/>
        <span style={{ flexGrow: 1, color: '#344054' }}>
          {props.description}
        </span>
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
          }} onClick = {deleteTodoItem}
        >
          <img src={crossIcon} alt="Delete" className="delete-icon" />
        </button>
      </div>
    </>
  )
}

export default TodoItem
