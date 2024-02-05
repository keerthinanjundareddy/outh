import React, { useState } from 'react';
import image from '../Assets/mdm_logo_original.jpeg';
import vector from '../Assets/lock, security, protection, padlock, 3 1.png';
import Email from '../Assets/email 1 (1).png';
import person from '../Assets/Human, person 1.png'
import './login.css';
import { ReactComponent as Eye } from '../Assets/shows.svg';
import { ReactComponent as Eyeslash } from '../Assets/hides.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function UserSignUp() {
    const [name, setName] = useState('');
  const [email, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [eyeicon, seteyeicon] = useState(true);
  const [eyelashicon, seteyelashicon] = useState(true);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  function togglepassword() {
    seteyeicon(!eyeicon);
  }

  function toggleconfirmpassword() {
  
    seteyelashicon(!eyelashicon);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let item = {name, email, password, confirmPassword };

    const headerObject = {
        'Content-Type':'application/json',
        "Accept":"*/*",
        // "Access-Control-Allow-Origin": "*",
      }
    const SignUpApi = ' https://mountain-enshrined-axolotl.glitch.me/register';

    axios
      .post(SignUpApi, item, { headers: headerObject })
      .then((res) => {
        console.log("signupaai res",res);
      

        window.alert('You have successfully signed up!');
        navigate('/'); // Use navigate instead of history.push
      })
      .catch((err) => {
        console.log("errors",err)
        if (err.response.data.errors) {
          window.alert(err.response.data.errors[0].msg);
        } else {
          window.alert(err.response.data.message);
        }
      });
  };

  const goToSignInPage = () => {
    navigate('/');
  };

  return (
    <>
    
      <section>
       
        <div className="form-containers">
          {/* <img className="images" src={image} alt="mdm-logo" /> */}
          <form>

          <h3 style={{textAlign:"Center"}}>SIGN UP</h3>
        
          
{/* have to change setLogin value for naame */}
          <div className="controls">
          
              <label className="emailtext">Name</label>
            </div>
            <div className="control">
              <input
                type="email"
                className="email-input"
                onFocus={(e) => {
                  e.preventDefault();
                  // Handle focus event
                }}
              
               
                placeholder="Enter Your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <img src={person} alt="padlock" className="Email-icon" />
            </div>
            <div className="controls">
              <label className="emailtext">Email id</label>
            </div>
            <div className="control">
              <input
                type="email"
                onFocus={(e) => {
                  e.preventDefault();
                  // Handle focus event
                }}
                className="email-input"
            
                placeholder="Enter Your Email id"
                value={email}
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
                <input type={eyeicon?("password"):("text")} className='password-input' placeholder="Enter your password" value={password} onChange={(e) => {setPassword(e.target.value)}}   />
                <img src={vector}  alt="padlock" className='password-icon' />
                <span className='password-show-icon-two' alt="padlock"  onClick={togglepassword} style={{width:"20px",height:"20px",objectFit:"contain"}} > {eyeicon ? (<Eye width="100%" height="100%" />) : (<Eyeslash width="100%" height="100%" />)}</span>
            </div>


            {/* <div className='controls'>
                <label className='texttwo'>Confirm Password</label>
            </div>
            <div className='control'>
                <input type={eyelashicon?("password"):("text")} className='password-input' placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => {setconfirmPassword(e.target.value)}}    />
                <img src={vector}  alt="padlock" className='password-icon' />
                <span className='password-show-icon-two' alt="padlock"  onClick={toggleconfirmpassword} style={{width:"20px",height:":20px",objectFit:"contain"}} > {eyelashicon ? (<Eye width="100%" height="100%" />) : (<Eyeslash width="100%" height="100%" />)}</span>
            </div> */}
           

            <div className="signupbuttons">
              <div className="controlSIGNUP">
                <button className="signupBTN" onClick={handleSubmit}>
                  Sign Up
                </button>
              </div>

              <div className="donthaveanaccounttext">
                Already have an Account
              </div>

              <div className="controlSIGNUP">
                <button className="loginSIGNUP" onClick={goToSignInPage}>
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
    
      </section>
    </>
  );
}
