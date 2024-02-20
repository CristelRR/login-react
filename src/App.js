import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Admin from './Admin';
import Usuario from './Usuario';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/inicio' element={<Login/>}></Route>
        <Route path='/registro' element={<Register/>}></Route>        
        <Route path='/admin' element={<Admin/>}></Route>        
        <Route path='/usuario' element={<Usuario/>}></Route>        
      </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
