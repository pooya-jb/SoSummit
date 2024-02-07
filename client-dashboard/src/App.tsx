import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector} from 'react-redux';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import { RootState } from './redux/store';
import PresentationPage from './components/PresentationPage/PresentationPage';
import useAuthentication from './hooks/useAuthentication';
import useSocket from './hooks/useSocket';
import useAdminSocket from './hooks/useAdminSocket';

function App(): React.ReactNode {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  // Checks for stored authentication and fetches
  useAuthentication();

  // Handles admin lobby subscriptions
  // useAdminSocketSubs();

  // Handles connections to admin Lobby
  useAdminSocket()

  // Subscribes to socket connection events and updates state accordingly
  useSocket();

  return (
    <>
      <ChakraProvider>
        <div id='app'>
          <Navbar />
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={isAuthenticated ? <Dashboard /> : <PresentationPage />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </ChakraProvider>
    </>
  );
}

export default App;
