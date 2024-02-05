import React from 'react'
import Email from '../Assets/email 1 (1).png';

function Forgotpassword() {
  return (
    <div>
      <section>
        <div className="form-container-forgotpassworddiv">
          {/* <img className="images" src={image} alt="mdm-logo" /> */}
          <form>
            <h3 style={{textAlign:"left"}}>FORGOT PASSWORD?</h3>
            <div style={{textAlign:"left",color:"grey"}}>Enter your registered email id to reset the password</div>
            <div className="controls" style={{marginTop:"30px"}}>
              <label className="emailtext">Email id</label>
            </div>
            <div className="control">
              <input
                type="email"
                className="email-input"
                style={{width:"80%"}}
                placeholder="Enter Your Email id"
                // value={email}
                // onChange={(e) => {
                //   setLogin(e.target.value);
                // }}
              />
              <img src={Email} alt="padlock" className="Email-icon" />
            </div>

            {/* <div className="controls">
              <label className="texttwo">Password</label>
            </div> */}
            <div className='control'>
                {/* <input type={icon?("password"):("text")}className='password-input'  style={{width:"99%"}} placeholder="Enter Your Password" value={password} onChange={(e) => {setPassword(e.target.value)}} /> */}
               
                {/* <img src={vector}  alt="padlock" className='password-icon' /> */}
                
                {/* <span className='password-show-icon' alt="padlock"  onClick={togglepassword} style={{width:"20px"}} > {icon ? (<Eye width="100%" height="100%" />) : (<Eyeslash width="100%" height="100%" />)}</span> */}
            </div>   

            {/* <div className="div-forgot-password">
              <a className="forgot-password" href="/forgotpassword">
                Forgot Password?
              </a>
            </div> */}

            <div className="control">
              <button className="login" >
              Submit
              </button>
            </div>

            {/* <div className="donthaveanaccounttext">Don't have an Account?</div>
            <div className="control">
              <button className="signup">
                Sign Up
              </button>
            </div> */}
          </form>
        </div>
      </section>
    </div>
  )
}

export default Forgotpassword
