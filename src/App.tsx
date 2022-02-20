import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Providers from 'utils/Providers';
import PrivateRoute from 'utils/PrivateRoute';

import Login from 'pages/Login';
import MainPage from 'pages/Main';
import MyEvent from 'pages/MyEvent';
import NotFound from 'pages/NotFound';
import EventDetail from 'pages/EventDetail';

import useInit from 'hooks/useInit';

function App() {
  useInit();
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Providers>
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
        </Providers>
      </BrowserRouter>
    </div>
  );
}

export default App;
