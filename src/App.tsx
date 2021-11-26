import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventDetail from './pages/EventDetail';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/EventDetail" element={<EventDetail />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
