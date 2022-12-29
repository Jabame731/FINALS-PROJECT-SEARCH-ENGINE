import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import { Routes, Route } from 'react-router-dom';
import NewsResults from './pages/NewsResults';
import ImageResults from './pages/ImageResults';
import WebResults from './pages/WebResults';
import Error from './components/Error';

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='web-search/:searchTerm' element={<WebResults />} />
          <Route path='news-search/:searchTerm' element={<NewsResults />} />
          <Route path='image-search/:searchTerm' element={<ImageResults />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
