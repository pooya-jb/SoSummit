import LoginForm from '../components/LoginForm/LoginForm';
import { useState } from 'react';
import SignupForm from '../components/SignupForm/SignupForm';
import LoginAdminForm from '../components/LoginAdminForm/LoginAdminForm';
const AuthScreen = () => {
  const [authState, setAuthState] = useState('login');
  if (authState === 'signup') {
    return <SignupForm setAuthState={setAuthState} />;
  } else {
    return <LoginForm setAuthState={setAuthState} />;
  }
};

export default AuthScreen;
