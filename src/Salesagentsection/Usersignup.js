import React, { useState } from 'react';
// import image from '../Assets/mdm_logo_original.jpeg';
import vector from '../Assets/lock, security, protection, padlock, 3 1.png';
import Email from '../Assets/email 1 (1).png';
import person from '../Assets/Human, person 1.png'
import './login.css';
import { ReactComponent as Eye } from '../Assets/shows.svg';
import { ReactComponent as Eyeslash } from '../Assets/hides.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function UserSignUp() {
    const [userTitle, setuserTitle] = useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setconfirmPassword] = useState('');
  const [eyeicon, seteyeicon] = useState(true);
  const [eyelashicon, seteyelashicon] = useState(true);
  const[error,setError]=useState("");
  const[emailerr,setEmailerr]=useState("");
  const[ PasswordErr,setPasswordErr]=useState("")
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const grant_type='password'
  const client_id=null;
  const client_secret=null;

  function togglepassword() {
    seteyeicon(!eyeicon);
  }

  function toggleconfirmpassword() {
  
    seteyelashicon(!eyelashicon);
  }

  // const validateEmail = (email) => {
  //   // Use a regular expression for basic email validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const validatePassword = (password) => {
  //   // Password should be strong, with at least one number, one upper case, one lower case,
  //   // and one special character, and characters should be between 8 to 15 only.
  //   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,15}$/;
  //   return passwordRegex.test(password);
  // };


  // const validateUserTitle = (userTitle) => {
  //   const titleRegex = /^[A-Za-z]+$/;
  //   return titleRegex.test(userTitle);
  // };


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check if the new password matches the validation
  //   if (validatePassword(newPassword)) {
  //     setPasswordErr(''); // Clear the password error when it's strong
  //   } else {
  //     setPasswordErr(
  //       'Password should be strong, with one number, one upper case, one lower case, one special character, and between 8 to 15 characters.'
  //     );
  //   }
  // };
  }


  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setusername(newEmail);
  }

    // Check if the new email matches the validation
  //   if (validateEmail(newEmail)) {
  //     setEmailerr(''); // Clear the email error when it's valid
  //   } else {
  //     setEmailerr('Invalid email address');
  //   }
  // };
  


  const handleUserTitleChange = (e) => {
    const newUserTitle = e.target.value;
    setuserTitle(newUserTitle);
  }
  //   if (validateUserTitle(newUserTitle)) {
  //     setError(''); // Clear the error when it's valid
  //   } else {
  //     setError('User title should contain only alphabets.');
  //   }
  // };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailerr("");
    let item = {userTitle,username, password,grant_type,client_id,client_secret };



    if (!userTitle.trim()) {
      setError('Username cannot be empty'); // Frontend error for empty username
      return;
    } else {
      setError(''); // Clear the frontend error when the username is not empty
    }

    // if (!validateEmail(username)) {
    //   setEmailerr('Invalid email address');
    //   return;
    // } else {
    //   setEmailerr(''); // Clear the error state when a valid email is entered
    // }


    // if (!validatePassword(password)) {
    //   setPasswordErr('Password should be strong, with one number, one upper case, one lower case, one special character, and between 8 to 15 characters.');
    //   return;
    // } else {
    //   setPasswordErr(''); // Clear the password error state when it's strong
    // }

    // if (!validateUserTitle(userTitle)) {
    //   setError('User title should contain only alphabets.');
    //   return;
    // } else {
    //   setError(''); // Clear the error state when a valid user title is entered
    // }
    
    const headerObject = {
        'Content-Type':'application/json',
        "Accept":"*/*",
        // "Access-Control-Allow-Origin": "*",
      }
    const SignUpApi = ' https://chat-bot-taupe-one.vercel.app/auth/register';

    axios
      .post(SignUpApi, item, { headers: headerObject })
      .then((res) => {
        console.log("signupaai res",res);
      console.log("successmsg",res.data.message);
      // setError(res.data.message);
      console.log("Error state after setting:", error);
        // window.alert(res.data.message);
        navigate('/'); // Use navigate instead of history.push
      })
      .catch((err) => {
        console.log("errors",err)
        if (err.response && err.response.data) {
        if (err.response.data.message === "user already exist!") {
          setEmailerr(
            "user already exist!"
            );
        } 
      else if (err.response.data.message === "Name is not correct!") {
            setError(
              "Name is not correct!"
            )
        }
        else if (err.response.data.message === "Email is invalid!") {
          setEmailerr(
            "Email is invalid!"
            )
          }
          else if (err.response.data.message === "Password should be strong, please use one number, one upper case, one lower case, and one special character, and characters should be between 8 to 15 only!") {
            setPasswordErr(
              "Password should be strong, please use one number, one upper case, one lower case, and one special character, and characters should be between 8 to 15 only!"
            )
            }
            else {
              
        // Handle other types of errors or set a generic error message
        setError("");
        setEmailerr("");
        setPasswordErr("");
      }
    }
    });
  };
        
          
            
      
 

  const loginhandle = () =>{
    navigate('/')
  }


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
                type="text"
                className="email-input"
                onFocus={(e) => {
                  e.preventDefault();
                 
                  // Handle focus event
                }}
              
               
                placeholder="Enter Your name"
                value={userTitle}
                onChange={handleUserTitleChange}
              />
              <img src={person} alt="padlock" className="Email-icon" />
            </div>
            <div style={{color:"red",fontSize:"12px"}}>{error}</div>
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
                value={username}
                onChange={handleEmailChange}
              />
              
              <img src={Email} alt="padlock" className="Email-icon" />
            </div>
            <div style={{color:"red",fontSize:"12px"}}>{emailerr}</div>


            <div className="controls">
              <label className="texttwo">Password</label>
            </div>
            <div className='control'>
                <input type={eyeicon?("password"):("text")} className='password-input' placeholder="Enter your password" value={password}  onChange={handlePasswordChange}   />
                <img src={vector}  alt="padlock" className='password-icon' />
                <span className='password-show-icon-two' alt="padlock"  onClick={togglepassword}  style={{width:"20px"}}  > {eyeicon ? (<Eye width="100%" height="100%" />) : (<Eyeslash width="100%" height="100%" />)}</span>
            </div>
    
        <div style={{color:"red",fontSize:"12px"}}>{ PasswordErr}</div>

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
                Already have an Account?
              </div>

              <div className="controlSIGNUP">
                <button className="loginSIGNUP" onClick={loginhandle} >
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
