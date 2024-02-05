import React, { useState } from 'react';
import image from '../Assets/mdm_logo_original.jpeg';
import vector from '../Assets/lock, security, protection, padlock, 3 1.png';
import Email from '../Assets/email 1 (1).png';
import { ReactComponent as Eye } from '../Assets/shows.svg';
import { ReactComponent as Eyeslash } from '../Assets/hides.svg';
import './login.css';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function UserSignin() {
  const [email, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [icon, seticon] = useState(true);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  function togglepassword() {
    seticon(!icon);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let item = { email, password };

    const headerObject = {
        'Content-Type':'application/json',
        "Accept":"*/*",
        // "Access-Control-Allow-Origin": "*",
      }
    const SigninApi ='https://mountain-enshrined-axolotl.glitch.me/login';
    // const SendOtpViaEmailApi = '/authenticate/mail';

    axios
      .post(SigninApi, item, { headers: headerObject })
      .then((res) => {
        console.log("signupaai res",res)
        window.alert('You have successfully signed up!');
        console.log("token",res.data.data.token)
        const token = res.data.data.token;
      

        // Store the token in local storage
        localStorage.setItem('userToken', token);
        console.log("apitoken",token)
        navigate('/Salesagentdashboard'); // Use navigate instead of history.push
      })
      .catch((err) => {
        if (err.response.data.errors) {
          window.alert(err.response.data.errors[0].msg);
        } else {
          window.alert(err.response.data.message);
        }
      });
  };


  const goToSignUpPage = () => {
    navigate('/UserSignUp'); // Use navigate instead of history.push
  };

  return (
    <>
   <section>
        <div className="form-container">
          {/* <img className="images" src={image} alt="mdm-logo" /> */}
          <form>
            <h3 style={{textAlign:"Center"}}>LOGIN</h3>
            <div className="controls">
              <label className="emailtext">Email id</label>
            </div>
            <div className="control" >
              <input
                type="email"
                // className="email-input"
               
                placeholder="Enter Your Email id"
                value={email}
                onClick={(e) => {
                  e.preventDefault();
                  // Handle focus event
                }}
                onChange={(e) => {
                  setLogin(e.target.value);
                }}
              />
              <img src={Email} alt="padlock" className="Email-icon" />
            </div>

            <div className="controls">
              <label className="texttwo">Password</label>
            </div>
            <div className='control'>
                <input type={icon?("password"):("text")}className='password-input'      onFocus={(e) => {
                  e.preventDefault();
                  // Handle focus event
                }} placeholder="Enter Your Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
               
                <img src={vector}  alt="padlock" className='password-icon' />
                
                <span className='password-show-icon' alt="padlock"  onClick={togglepassword} style={{width:"20px"}} > {icon ? (<Eye width="100%" height="100%" />) : (<Eyeslash width="100%" height="100%" />)}</span>
            </div>   

            <div className="div-forgot-password">
              <a className="forgot-password" href="/forgotpassword">
                Forgot Password?
              </a>
            </div>

            <div className="control">
              <button className="login" onClick={handleSubmit}>
                Login
              </button>
            </div>

            <div className="donthaveanaccounttext">Don't have an Account?</div>
            <div className="control">
              <button className="signup" onClick={goToSignUpPage}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
        </section>
    </>
  );
}
