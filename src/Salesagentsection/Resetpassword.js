// Resetpassword.jsx
import React, { useState } from 'react';
import vector from '../Assets/lock, security, protection, padlock, 3 1.png';
import { ReactComponent as Eye } from '../Assets/shows.svg';
import { ReactComponent as Eyeslash } from '../Assets/hides.svg';
import './login.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Resetpassword() {
  const [eyeicons, seteyeicon] = useState(true);
  const [eyelashicons, seteyelashicon] = useState(true);
  const [passwords, setPassword] = useState('');
  const [confirmPasswords, setconfirmPassword] = useState('');
  const navigate = useNavigate();
  const { userID } = useParams(); // Use useParams to get the user ID from the URL

  const togglepassword = () => {
    seteyeicon(!eyeicons);
  };

  const toggleconfirmpassword = () => {
    seteyelashicon(!eyelashicons);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (passwords !== confirmPasswords) {
      window.alert("Passwords do not match");
      return;
    }

    console.log("resetuserId", userID)

    // Prepare the data for the API request
    const requestData = {
      password: passwords,
      confirmPassword: confirmPasswords,
    };


    // console.log("userId",userId)
    // Make the API request using Axios
    axios
      .post(`https://chat-bot-taupe-one.vercel.app/auth/reset-password/${userID}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log("reset reseult",res)
        window.alert("password saved succesfully");
        navigate('/'); // Change the route based on your application
      })
      .catch((err) => {
        console.error('Error resetting password:', err);
        window.alert('Error resetting password. Please try again.');
      });
  };

  return (
    <>
      <section>
        <div className="form-containers-resetpassword">
          <form>
            <h3 style={{ textAlign: 'Center' }}>RESET PASSWORD</h3>

            <div className="control">
              <label className="texttwo">Password</label>
            </div>
            <div className='control'>
              <input type={eyeicons ? ("password") : ("text")} className='password-input' placeholder="Enter your password" style={{ width: "80%" }} value={passwords} onChange={(e) => { setPassword(e.target.value) }} />
              <img src={vector} alt="padlock" className='password-icon' />
              <span className='password-show-icon' alt="padlock" onClick={togglepassword} style={{ width: "20px", zIndex: "100" }}> {eyeicons ? (<Eye width="100%" height="100%" />) : (<Eyeslash width="100%" height="100%" />)}</span>
            </div>

            <div className='control' style={{ marginTop: "20px" }}>
              <label className='texttwo' >Confirm Password</label>
            </div>
            <div className='control'>
              <input type={eyelashicons ? ("password") : ("text")} className='password-input' placeholder="Re-enter your password" style={{ width: "80%" }} value={confirmPasswords} onChange={(e) => { setconfirmPassword(e.target.value) }} />
              <img src={vector} alt="padlock" className='password-icon' />
              <span className='password-show-icon' alt="padlock" onClick={toggleconfirmpassword} style={{ width: "20px", zIndex: "100" }}> {eyelashicons ? (<Eye width="100%" height="100%" />) : (<Eyeslash width="100%" height="100%" />)}</span>
            </div>

            <div className="signupbuttons">
              <div className="controlSIGNUP">
                <button className="signupBTN" onClick={handleSubmit}>
                  Reset password
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Resetpassword;
