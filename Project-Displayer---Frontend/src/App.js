import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Info from './pages/Info';
import UploadForm from './pages/UploadForm';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/upload' element={<UploadForm/>}/>
      <Route path="/website/:key" element={<About/>}/>
      <Route path="/info" element={<Info/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
