import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import EventDetail from './pages/EventDetail';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import './App.css';

function App() {

  return (
    <div className="wrapper">
      <BrowserRouter>
        <EventProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/detail/:eventId" element={<EventDetail />} />
          </Routes>
        </EventProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
