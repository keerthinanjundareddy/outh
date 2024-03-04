import React, { useState } from 'react';
// import image from '../Assets/mdm_logo_original.jpeg';
import vector from '../Assets/lock, security, protection, padlock, 3 1.png';
import Email from '../Assets/email 1 (1).png';
import { ReactComponent as Eye } from '../Assets/shows.svg';
import { ReactComponent as Eyeslash } from '../Assets/hides.svg';
import './login.css';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function UserSignin({ setIsAuthenticated}) {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [icon, seticon] = useState(true);
  const[emailmessage,setEmailmessage]=useState("")
  const[passwordMessage,setPasswordMessage]=useState("")
  const navigate = useNavigate(); 

  function togglepassword() {
    seticon(!icon);
  }

  

  function handleSubmit(e) {
    e.preventDefault();


     if (!username.trim()) {
      setEmailmessage('EmailId cannot be empty'); // Frontend error for empty username
      return;
    } else {
      setEmailmessage(''); // Clear the frontend error when the username is not empty
    }
    

    if (!password.trim()) {
      setPasswordMessage('Password cannot be empty'); // Frontend error for empty username
      return;
    } else {
      setPasswordMessage(''); // Clear the frontend error when the username is not empty
    }
    

    const details = {
      username: username,
      password: password,
      grant_type: 'password',
      client_id: null,
      client_secret: null,
    };
  
    const formBody = Object.keys(details)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]))
      .join('&');

      console.log("formBody",formBody)
  
 
    axios.post('https://chat-bot-taupe-one.vercel.app/auth/login', formBody, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then((res) => {
      // console.log("data",res);
      // Store the access token 
      const accessToken = res.data.access_token;
      // console.log("accesstoken",accessToken)
      localStorage.setItem('accessToken', accessToken);

      // window.alert("success");

      setIsAuthenticated(true);
      
      navigate('/chatbot'); // Use navigate 
    })
    .catch((err) => {
      // console.log("siginerror",err)
      if (err.response.data === "User with given email doesn't exist") {
        setEmailmessage(err.response.data);
      } 
      else if (err.response.data === '"username" must be a valid email') {
        setEmailmessage(
          "enter valid email"
        )
        }
      else if (err.response.data === "Invalid password") {
        setPasswordMessage(
          err.response.data
        )
        }
        else {
        // Handle other types of errors or set a generic error message
        setEmailmessage("");
        setPasswordMessage("")
      }
    });
  }

  const handlleSignup = () =>{
    navigate('/UserSignUp')
  }

  const handlePassword = () =>{
    navigate('/forgotpassword')
  }



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
                value={username}
                onClick={(e) => {
                  e.preventDefault();
                  // Handle focus event
                }}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />
              <img src={Email} alt="padlock" className="Email-icon" />
           
            </div>
            <label style={{color:"red",fontSize:"12px"}}>{emailmessage}</label>

            <div className="controls">
              <label className="texttwo">Password</label>
            </div>
            <div className='control'>
                <input type={icon?("password"):("text")} className='password-input'  onFocus={(e) => {
                  e.preventDefault();
                  // Handle focus event
                }}   placeholder="Enter Your Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
               
                <img src={vector}  alt="padlock" className='password-icon' />
                
                <span className='password-show-icon' alt="padlock"  onClick={togglepassword} style={{width:"20px"}} > {icon ? (<Eye width="100%" height="100%" />) : (<Eyeslash width="100%" height="100%" />)}</span>
               
            </div>   
            <label style={{color:"red",fontSize:"12px"}}>{passwordMessage}</label>

            <div className="div-forgot-password">
              <div className="forgot-password" onClick={handlePassword} >
                Forgot Password?
              </div>
            </div>

            <div className="control">
              <button className="login" onClick={handleSubmit}>
                Login
              </button>
            </div>

            <div className="donthaveanaccounttext">Don't have an Account?</div>
            <div className="control">
              <button className="signup" onClick={handlleSignup} >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        </section>
    </>
  );
}
