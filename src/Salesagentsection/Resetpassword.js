import React,{useState}from 'react'
import image from '../Assets/mdm_logo_original.jpeg';
import vector from '../Assets/lock, security, protection, padlock, 3 1.png';
import Email from '../Assets/email 1 (1).png';
import { ReactComponent as Eye } from '../Assets/shows.svg';
import { ReactComponent as Eyeslash } from '../Assets/hides.svg';
import './login.css';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Resetpassword() {
    const [eyeicons, seteyeicon] = useState(true);
    const [eyelashicons, seteyelashicon] = useState(true);
    const [passwords, setPassword] = useState('');
    const [confirmPasswords, setconfirmPassword] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
  
    function togglepassword() {
      seteyeicon(!eyeicons);
    }
  
    function toggleconfirmpassword() {
    
      seteyelashicon(!eyelashicons);
    }
  return (
    <>
    <section>
        <div className="form-containers-resetpassword">
          {/* <img className="images" src={image} alt="mdm-logo" /> */}
          <form>

          <h3 style={{textAlign:"Center"}}>RESET PASSWORD</h3>
        
          
{/* have to change setLogin value for naame */}
          {/* <div className="controls"> */}
          
              {/* <label className="emailtext">Name</label> */}
            {/* </div> */}
            {/* <div className="control">
              <input
                type="email"
                className="email-input"
                style={{width:"98%"}}
                placeholder="Enter Your name"
                // value={name}
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
              />
              {/* <img src={person} alt="padlock" className="Email-icon" /> */}
            {/* </div> */} 
            {/* <div className="controls">
              <label className="emailtext">Email id</label>
            </div>
            <div className="control">
              <input
                type="email"
                className="email-input"
                style={{width:"98%"}}
                placeholder="Enter Your Email id"
                // value={email}
                // onChange={(e) => {
                //   setLogin(e.target.value);
                // }}
              />
              {/* <img src={Email} alt="padlock" className="Email-icon" /> */}
            {/* </div> */} 

            <div className="control">
              <label className="texttwo">Password</label>
            </div>
            <div className='control'>
                <input type={eyeicons?("password"):("text")} className='password-input' placeholder="Enter your password" style={{width:"80%"}} value={passwords} onChange={(e) => {setPassword(e.target.value)}} />
                <img src={vector}  alt="padlock" className='password-icon' />
                <span className='password-show-icon' alt="padlock"  onClick={togglepassword} style={{width:"20px",zIndex:"100"}} > {eyeicons ? (<Eye width="100%" height="100%" />) : (<Eyeslash width="100%" height="100%" />)}</span>
            </div>


            <div className='control' style={{marginTop:"20px"}}>
                <label className='texttwo' >Confirm Password</label>
            </div>
            <div className='control'>
                <input type={eyelashicons?("password"):("text")} className='password-input' placeholder="Re-enter your password" style={{width:"80%"}} value={confirmPasswords} onChange={(e) => {setconfirmPassword(e.target.value)}} />
                <img src={vector}  alt="padlock" className='password-icon' />
                <span className='password-show-icon' alt="padlock"  onClick={toggleconfirmpassword} style={{width:"20px",zIndex:"100"}} > {eyelashicons? (<Eye width="100%" height="100%" />) : (<Eyeslash width="100%" height="100%" />)}</span>
            </div>
           

            <div className="signupbuttons">
              <div className="controlSIGNUP">
                <button className="signupBTN">
                 Reset password
                </button>
              </div>

              {/* <div className="donthaveanaccounttext">
                Already have an Account
              </div> */}

              {/* <div className="controlSIGNUP">
                <button className="loginSIGNUP">
                  Login
                </button> */}
              {/* </div> */}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
export default Resetpassword