import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
