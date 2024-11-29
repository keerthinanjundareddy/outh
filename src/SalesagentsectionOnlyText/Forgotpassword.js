import React, { useState } from 'react';
import Emails from '../Assets/email 1 (1).png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Forgotpassword({ setEmailVerified }) {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null); 
  const[errmsg,setErrmsg]=useState('');
  // State to store the received user ID
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

   
      // Frontend validation: Check if email is empty
      if (!email.trim()) {
        setErrmsg('Email cannot be empty.');
        return;
      } else {
        setErrmsg(''); // Clear the frontend error when the email is not empty
      }

    let item = { email };

    const headerObject = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    };

    const forgotPasswordApi = 'https://chat-bot-taupe-one.vercel.app/auth/forgot-password';

    axios
      .post(forgotPasswordApi, item, { headers: headerObject })
      .then((res) => {
        // window.alert(res.data.message);
        setUserId(res.data.userID); 
        console.log("userid", res.data.userID); // Save the received user ID in state

        // Set emailVerified to true after successful email verification
        setEmailVerified(true);

        navigate(`/resetpassword/${res.data.userID}`); // Navigate to the reset password screen
      })
      .catch((err) => {
        console.log("errors", err);
        if (err.response) {
          
            setErrmsg('User with the given email does not exist.');
          
        }
      });
  };

  return (
    <div>
      <section>
        <div className="form-container-forgotpassworddiv">
          <form>
            <h3 style={{ textAlign: "center" }}>FORGOT PASSWORD?</h3>
            <div style={{ textAlign: "left", color: "grey", marginTop: "30px" }}>Enter your registered email id to reset the password</div>
            <div className="controls" style={{ marginTop: "20px" }}>
              <label className="emailtext">Email id</label>
            </div>
            <div className="control">
              <input
                type="email"
                className="email-input"
                style={{ width: "80%" }}
                placeholder="Enter Your Email id"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <img src={Emails} alt="padlock" className="Email-icon" />
            </div>
             {errmsg && <div style={{ color: 'red', fontSize: '12px' }}>{errmsg}</div>}

            <div className="control">
              <button className="login" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Forgotpassword;
