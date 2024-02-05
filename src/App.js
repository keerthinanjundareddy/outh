import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Salesagentdashboard from './Salesagentsection/Salesagentdashboard';
import UserSignin from './Salesagentsection/Usersignin';
import UserSignUp from './Salesagentsection/Usersignup';
import Forgotpassword from './Salesagentsection/Forgotpassword';
import Resetpassword from './Salesagentsection/Resetpassword';
import { Navigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status here, e.g., by looking at a token in local storage
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserSignin />} />
          <Route path="/UserSignUp" element={<UserSignUp />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/resetpassword" element={<Resetpassword />} />

          {isAuthenticated ? (
            <Route path="/salesagentdashboard" element={<Salesagentdashboard />} />
          ) : (
            // Redirect to the sign-in page if not authenticated
            <Route path="/salesagentdashboard" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
