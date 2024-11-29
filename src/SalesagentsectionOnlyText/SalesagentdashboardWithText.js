import React, { useState, useRef, useEffect } from 'react';
import './Salesagentdashboard.css';
// import persontwo from '../Assets/person.png';
import hamburger from '../Assets/3.png';
// import Funding from '../Assets/Funding.png'
import close from '../Assets/row2.png';
import closetwo from '../Assets/row2.png'
import axios from 'axios';
import logout from '../Assets/logout, exit, sign, out 1.png'

function Newbot({ handleLogout }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [chats, setChats] = useState([]);
  const messageListRef = useRef(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [hamburgerdisplay, setHamburgerDisplay] = useState(true);
  const [selectedChatTitle, setSelectedChatTitle] = useState('');
  const [messageHistory, setMessageHistory] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionOrder, setQuestionOrder] = useState([]);
  const [apiResponse, setApiResponse] = useState([]); // Maintain the order of questions
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [showemployeePopup, setShowemployeePopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


const [sourceDocuments, setSourceDocuments] = useState([]);
const popupRef = useRef(null);

const [sourceDocumentsMap, setSourceDocumentsMap] = useState({});

const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('');

  const handleButtonClick = (documents) => {
    setPopupContent(`<ul style="margin: 5px 0; list-style-type: decimal;">${documents.map((document) => `<li style="padding-top: 10px;">${document.page_content}</li>`).join('')}</ul>`);



   console.log("popupcontanet",popupContent)
    setShowPopup(true);
  };
  

  const closePopup = () => {
    setShowPopup(false);
    setPopupContent('');
  };



  const handleInputChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };
  

  // const clearSidebarHistory = () => {
  //   setQuestionOrder([]); // Clear the order of questions
  //   setMessageHistory({}); // Clear the message history for questions
  // };
  const clearSidebarHistory = () => {
    setQuestionOrder([]); // Clear the order of questions
  };
  // const clearConversation = () => {
  //   // Clear only the chat messages and user input field

  //   // to aavaaaoi resonse
  //   setWaitingForResponse(false);
  
  //   setQuestionOrder([]);
  //   setChats([]);
  //   setMessages([]);
  //   setUserInput('');
  // };


  const clearConversation = () => {
    // Check if waiting for a response, and return if true
    if (waitingForResponse) {
      return;
    }
  
    // Clear only the chat messages and user input field
    setWaitingForResponse(false);
    setQuestionOrder([]);
    setChats([]);
    setMessages([]);
    setUserInput('');
  };
  
  
  const clearQuestionHistory = () => {
    setQuestionOrder([]);
  };
  
  const clearChat = (clearConversationHistory) => {
    if (messages.length > 0) {
      if (clearConversationHistory) {
        // Clear the entire conversation history 
        setChats([]);
        setMessageHistory({});
      } else {
        // Clear only the sidebar's question history
        setQuestionOrder([]);
      }
  
      setUserInput('');
      setCurrentQuestion('');
    }
  };
  
  

 
  const sendMessage = () => {
    if (userInput.trim() === '' || waitingForResponse) return;
  
    setWaitingForResponse(true);
    setLoadingResponse(true);
  
    const newMessage = {
      text: userInput,
      timestamp: new Date().toLocaleTimeString(),
    };
  
    setMessages([...messages, newMessage]);
  
    if (currentQuestion) {
      setCurrentQuestion(userInput);
      setQuestionOrder([...questionOrder, userInput]);
      setMessageHistory((prevHistory) => ({
        ...prevHistory,
        [currentQuestion]: [...(prevHistory[currentQuestion] || []), newMessage],
      }));
    } else {
      // If there is no current question, create one and set its message history
      setCurrentQuestion(userInput);
      setQuestionOrder([...questionOrder, userInput]);
      setMessageHistory((prevHistory) => ({
        ...prevHistory,
        [userInput]:[newMessage], // Create a new question with the first message
      }));
    }
    setUserInput('');
    
 
  


    const querys = userInput;

    const existingResponse = apiResponse[querys];
    
    if (existingResponse) {
      // If the response for the current question is already available, use it
      setUserInput(''); 
      setLoadingResponse(false);
      setWaitingForResponse(false);
// Clear userInput when the question is the same
      return;
    }
  
    
    console.log("query",querys)

    const requestBody = {
      question:  querys
    };
  
    const headerObject = {
      'Content-Type': 'application/json',
      Accept: '*/*',
    };
  
    const dashboardsApi = "https://document-qa.apprikart.com/api/rag.qa_chain/run";
  
    axios.post(dashboardsApi, requestBody, { headers: headerObject })
      .then((response) => {
        console.log("API Response:", response);
        const responseData = response.data.result;
        console.log("responsedata",responseData)
 
        const answer = responseData;
  
        setApiResponse((prevResponse) => ({
          ...prevResponse,
          [querys]: answer,
        }));
  
        setSourceDocuments(response.data.source_documents || []);
        setSourceDocumentsMap((prevDocuments) => ({
          ...prevDocuments,
          [querys]: response.data.source_documents,
        }));
        setLoadingResponse(false);
      })
      .catch((err) => {
        console.log("error", err);
        setApiResponse((prevResponse) => ({
          ...prevResponse,
          [querys]: "Internal Server Error",
        }));
        setLoadingResponse(false);
      })
      .finally(() => {
        // setLoadingResponse(false);
        setWaitingForResponse(false);
      });
 
  };
  
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  function hamburgerclose() {
    setHamburgerDisplay(!hamburgerdisplay);
  }

  function hamburgerdisappearing() {
    setHamburgerDisplay(!hamburgerdisplay);
  }

  const selectChat = (title) => {
    setSelectedChatTitle(title);
  
    if (title === 'New Chat') {
      setCurrentQuestion('');
      setMessages([]);
    } else {
      setCurrentQuestion(title);
  
      // Check if message history exists for the selected title
      if (messageHistory[title]) {
        setMessages(messageHistory[title]);
      } else {
        // If message history does not exist, set messages to an empty array
        setMessages([]);
      }
    }
  };
  
  const displayChat = (title) => {
  setCurrentQuestion(title);
  if (title === 'New Chat') {
    setMessages([]);
  } else {
    setMessages(messageHistory[title] || []);
  }
};


  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };



  const logoutHandler = () => {
    // Call the handleLogout function passed as a prop
    handleLogout();
  };



  const closePopupOutsideClick = (e) => {
    // Check if the click occurred outside the popup container
    if (showPopup && popupRef.current && !popupRef.current.contains(e.target)) {
      closePopup();
    }
  };

  useEffect(() => {
    // Add event listener for mousedown on the entire document
    document.addEventListener('mousedown', closePopupOutsideClick);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', closePopupOutsideClick);
    };
  }, [showPopup]);

  return (
    <>
      <div className={`navbar ${inputFocused ? 'navbar-focused' : ''}`}>
        <div className='chat-parent-div'>
          <div style={{display:"flex",flexDirection:"row",gap:"10px",alignItems:"center"}} className='inner-chat-paarent-div'>
            <div>
            {/* <img src={Funding} alt="funding-icon" style={{width:"40px",height:"40px"}} /> */}
            </div>
            <div style={{color:"#21261B",fontWeight:"600",letterSpacing:"0.5px"}} className='document-text'>
            SALES COACH ASSISTANT
            </div>
          </div>
          <div className='hamburger-button' onClick={hamburgerclose}>
            <img
              src={hamburger}
              alt="hamburger-icon"
              style={{ width: '40px', height: '40px' }}
              className='hamburger-icon'
            />
          </div>
        </div>

        <div className='clear-chat-parent-div'>
        <div className='new-chat-div-two' onClick={logoutHandler} style={{display:"flex",flexDirection:"row",gap:"2px"}} >
        <div>logout</div>
        <div style={{width:"20px",height:"20px"}}><img src={ logout} alt="shareicon" style={{width:"100%",height:"100%",objectFit:"contain"}} /></div>
        </div>
          <div className='new-chat-div'  onClick={() => clearConversation()}  >
            + New Chat
          </div>
          <div
            className={`toggle-sidebar-button ${
              mobileSidebarOpen ? 'open' : ''
            }`}
            onClick={toggleMobileSidebar}
          >
            {/* <img
              // src={persontwo}
              alt='person-icon'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }} */}
            {/* /> */}
          </div>
        </div>
      </div>

      <div className={hamburgerdisplay ? 'sidebaropen' : 'sidebarclose'}>
        <div className='sidebar-content'>
         
        <div style={{ display: "flex", flexDirection: "row",alignItems:"center" }} className='nav-topsec'>
              {/* <div> */}
            <div
              key='New Chat'
              className={`chat-title ${
                selectedChatTitle === 'New Chat' ? 'selected' : ''
              }`}
            
              style={{textAlign:"center"}}
             >
             Chat History
            </div>
            {/* </div> */}
          
            <div onClick={hamburgerdisappearing} className='hamburgerdisappearingicon'>
              <img src={close} alt="close-icon" style={{ width: "20px", height: "20px",marginTop:"2px"}} />
            </div>
            
            </div>
            {/* <div className='clear-chat-button' onClick={() => clearQuestionHistory()}  style={{textAlign:"center",border:"1px solid white",width:"50%",marginLeft:"25%"}}>
  Clear Chat
</div> */}
          <div className='question-section' style={{ flexBasis: "100%" }}>
  {questionOrder.map((question, index) => (
    index === 0 && (
    
      <li
        key={index}
        className={`chat-title ${question === selectedChatTitle ? 'selected' : ''}`}
        onClick={() => {
          // selectChat(question);
          hamburgerdisappearing();
        }}
        style={{ padding: "5px", borderRadius: "5px", backgroundColor: "#191C14", marginTop: "10px", marginLeft: "10px", marginRight: "10px",   }}
      >
        {question}
      </li>
     
    )
  ))}
</div>

         
        </div>
      </div>

      <div className='chat-app' >
        <div className='chat' >
          <div
            className='message-list'
            ref={messageListRef}
           
          >
             <div className='user-parent-output-div'>
                    <div className='user-timestamp-parent-div-two'>
                      <div className='chatbot-name-div'>BOT</div>
                      {/* <div className='chatbot-time-div'>{message.timestamp}</div> */}
                    </div>
                    <div className='chatbot-output-div'>
                    Hi,is there something specific you're looking for?
                   </div>
      
                  </div>
            {messages.map((message, index) => (
              <div
                key={index}
                className='message'
                >
               
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                  <div className='user-parent-div'>
                    <div className='user-timestamp-parent-div'>
                      <div className='user-name-div'>USER</div>
                      {/* <div className='user-time-div'>{message.timestamp}</div> */}
                    </div>
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <div className='user-question-div'>{message.text}</div>
                 
                    </div>
                  </div>
                  <div className='user-parent-output-div'>
                    <div className='user-timestamp-parent-div-two'>
                      <div className='chatbot-name-div'>BOT</div>
                      {/* <div className='chatbot-time-div'>{message.timestamp}</div> */}
                    </div>
                    <div className='chatbot-output-div'>
                    {loadingResponse && message.text === currentQuestion ? (<span className="loading-dots" />) :(
    <>
    {apiResponse[message.text] || ''}
    {sourceDocumentsMap[message.text]?.length > 0 && (
      <div>
        <div onClick={() => handleButtonClick(sourceDocumentsMap[message.text])} style={{color:"#3E4733"}} className='view-sources-txt'>
       View sources
        </div>
      </div>
    )}
  </>
)}


 {showPopup && (
  <>
     
<div className="backdrop-blur" onClick={closePopup}   />

       <div className="popup-container"   ref={popupRef} >
          <div className="popup-content" style={{display:"flex",flexDirection:"column",}} >
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
              
            <div></div>
            {/* <div className="close-button"  onClick={closePopup}>
           <img src={closetwo }  style={{paddingTop:"10px",paddingRight:"10px",width:"30px",height:"30px"}} alt="close-icon" className='close-section-popup'/>
            </div> */}
            </div>
            <div style={{color:"black",textAlign:"center"}} className='source-text'>Sources</div>
          <div className="popup-content-text" dangerouslySetInnerHTML={{ __html: popupContent }}></div>
            {/* <button onClick={closePopup}>Close Popup</button> */}
          </div>
          <div className='popup-close-btn'>
          <div className='popup-close-buttons'  onClick={closePopup}>Close</div>
          </div>
        </div>
        </>
      )}
        </div>
        
        {/* <div onClick={() => handleMoreLinkClick(apiResponse[message.text] || '')}>more</div> */}

                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='user-input'>
            <input
            className='down-input-text'
              type='text'
              placeholder='Type your message..'
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyPress}
              style={{fontFamily:"Sora, sans-serif",border:"1px solid black", }}
                />
            <button onClick={sendMessage} disabled={waitingForResponse}>Send</button>
          </div>
        </div>
      </div>





    </>
  );
}

export default Newbot;