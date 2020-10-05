import React from 'react';
import './App.css';
import { UserAuthProvider } from './Component/FireBaseAuth/auth';
import Routes from './Component/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <UserAuthProvider>
      <Router>
        <Routes />
      </Router>
    </UserAuthProvider>
  );
}

export default App;
