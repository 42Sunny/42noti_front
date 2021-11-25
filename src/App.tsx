import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventDetail from './pages/EventDetail';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EventDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
