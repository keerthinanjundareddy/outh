import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Salesagentdashboard from './Salesagentsection/Salesagentdashboard';
import UserSignin from './Salesagentsection/Usersignin';
import UserSignUp from './Salesagentsection/Usersignup';
import Forgotpassword from './Salesagentsection/Forgotpassword';
import Resetpassword from './Salesagentsection/Resetpassword';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false); 

  useEffect(() => {
    // Checking  authentication status over here, checking by looking at a token in local storage
    const userToken = localStorage.getItem('accessToken');
    if (userToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    //  accessToken is stored in localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Display an alert
    // window.alert("Logout successful");

    // Remove the accessToken from localStorage
    localStorage.removeItem('accessToken');

    // Set isAuthenticated to false 
    setIsAuthenticated(false);


    setEmailVerified(false);

   
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserSignin  setIsAuthenticated={ setIsAuthenticated }/>} />
          <Route path="/UserSignUp" element={<UserSignUp />} />
          <Route path="/forgotpassword" element={<Forgotpassword setEmailVerified={setEmailVerified} />} />
          <Route
  path="/resetpassword/:userID"
  element={emailVerified ? <Resetpassword /> : <Navigate to="/forgotpassword" />}
/>


          {isAuthenticated ? (
            <Route path="/chatbot" element={<Salesagentdashboard handleLogout={handleLogout} />} />
          ) : (
            // Redirect to the sign-in page if not authenticated
            <Route path="/chatbot" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
