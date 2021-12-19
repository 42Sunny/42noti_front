import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EventProvider } from './contexts/EventContext';
import ScrollTop from './components/ScrollTop'
import EventDetail from './pages/EventDetail';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import MyEvent from './pages/MyEvent';
import './App.css';

function App() {

  return (
    <div className="wrapper">
      <BrowserRouter>
      <ScrollTop />
        <EventProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my" element={<MyEvent />} />
            <Route path="/detail/:eventId" element={<EventDetail />} />
          </Routes>
        </EventProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
