import React from "react";
import styles from "./selectPage.module.css";
import mic from "../Assets/mic_icon.png";
import text from "../Assets/text_icon.jpg";
import { useNavigate } from "react-router-dom";
import logout from "../Assets/logout, exit, sign, out 1.png";
// import "./Salesagentdashboard.css";
import "../Salesagentsection/Salesagentdashboard.css";

export default function SelectPage({ handleLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="">
        <div
          style={{
            display: "flex",
            //   flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            justifyContent: "space-between",
            width:'100%',
            borderBottom:'1px solid rgb(0,0,0,0.1)',
            padding:"0px 10px 0px 10px"
          }}
          className="inner-chat-paarent-div"
        >
       
          <div
            style={{
              color: "#21261B",
              fontWeight: "600",
              letterSpacing: "0.5px",
              cursor: "pointer",
            }}
            className="document-text"
          >
            SALES COACH ASSISTANT
          </div>
          <div
            className="new-chat-div-two"
            onClick={handleLogout}
            style={{ display: "flex", flexDirection: "row", gap: "2px", position:'relative',right:'1.5rem' }}
          >
            <div>logout</div>
            <div style={{ width: "20px", height: "20px" }}>
              <img
                src={logout}
                alt="shareicon"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
        {/* <div className="hamburger-button" onClick={hamburgerclose}>
            <img
              src={hamburger}
              alt="hamburger-icon"
              style={{ width: "40px", height: "40px" }}
              className="hamburger-icon"
            />
          </div> */}
      </div>

      <div className={styles.container}>
        <div
          onClick={() => navigate("/chatbot")}
          className={styles.chatbotCard}
        >
          <img style={{ width: "60%", margin: "20px" }} src={mic} alt="" />
          <span> Audio to audio</span>
        </div>
        <div
          onClick={() => navigate("/chatbot-text")}
          className={styles.chatbotCard}
        >
          <img src={text} alt="" />
          <span> Text to text</span>
        </div>
      </div>
    </>
  );
}
