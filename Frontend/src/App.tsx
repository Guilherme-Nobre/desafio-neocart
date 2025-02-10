import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './pages/home/home';
import CreateTask from './pages/createTask/createTask';
import UpdateTask from './pages/updateTask/updateTask';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/createTask' element={<CreateTask />} />
              <Route path='/updateTask/:id' element={<UpdateTask />} />
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  )
}

export default App
