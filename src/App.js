
import './App.css';
import Sidebar from './compontents/Sidebar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Reparti from './pages/Reparti';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path='/reparti' exact Component={Reparti} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
