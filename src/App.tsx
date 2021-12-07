import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import EventDetail from './pages/EventDetail';
import MainPage from './pages/MainPage';

function App() {

  return (
    <div className="wrapper">
      <BrowserRouter>
        <EventProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/detail/:eventId" element={<EventDetail />} />
          </Routes>
        </EventProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
