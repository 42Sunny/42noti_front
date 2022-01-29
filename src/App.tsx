import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import ScrollTop from './utils/ScrollTop';
import EventDetail from './pages/EventDetail';
import MainPage from './pages/Main';
import Login from './pages/Login';
import MyEvent from './pages/MyEvent';
import NotFound from './pages/NotFound';
import './App.css';
import Provider from './utils/Provider';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <ScrollTop />
        <Provider>
          <Routes>
            <Route
              path=""
              element={
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              }
            />
            <Route
              path="my/*"
              element={
                <PrivateRoute>
                  <MyEvent />
                </PrivateRoute>
              }
            />
            <Route path="detail">
              <Route
                path=":eventId"
                element={
                  <PrivateRoute>
                    <EventDetail />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
