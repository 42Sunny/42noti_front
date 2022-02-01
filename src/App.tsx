import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Provider from 'utils/Provider';
import ScrollTop from 'utils/ScrollTop';
import PrivateRoute from 'utils/PrivateRoute';

import Login from 'pages/Login';
import MainPage from 'pages/Main';
import MyEvent from 'pages/MyEvent';
import NotFound from 'pages/NotFound';
import EventDetail from 'pages/EventDetail';

import useInit from 'hooks/useInit';

import 'App.css';

function App() {
  useInit();
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
