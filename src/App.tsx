import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventProvider from './contexts/EventContext';
import UserProvider from './contexts/UserContext';
import ScrollTop from './utils/ScrollTop';
import EventDetail from './pages/EventDetail';
import MainPage from './pages/Main';
import Login from './pages/Login';
import MyEvent from './pages/MyEvent';
import './App.css';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <ScrollTop />
        <UserProvider>
          <EventProvider>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my" element={<MyEvent />} />
              <Route path="/detail/:eventId" element={<EventDetail />} />
            </Routes>
          </EventProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
