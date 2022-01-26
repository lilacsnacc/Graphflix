import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FrontPage from './components/FrontPage/FrontPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
      </Routes>
    </BrowserRouter>);
}

export default App;
