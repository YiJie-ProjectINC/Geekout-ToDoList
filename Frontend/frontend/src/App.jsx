import { BrowserRouter, Route, Routes } from 'react-router-dom'
import logo from './logo.svg'
import Todo from './components/Todo'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route
          path="/home"
          element={
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.tsx</code> and save to reload.
                </p>
              </header>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
