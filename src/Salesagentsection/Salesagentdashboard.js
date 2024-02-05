import React, { useState, useRef, useEffect } from 'react';
import './Salesagentdashboard.css';
import persontwo from '../Assets/person.png';
import hamburger from '../Assets/hamburger-menu-icon-png-white-18 (1).jpg';
import Funding from '../Assets/Funding.png'
import close from '../Assets/icons8-close-window-50.png';
import axios from 'axios';

function Salesagentdashboard() {
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
    if (userInput.trim() === '' || waitingForResponse) return; // Disable sending if no input or waiting for a response

    setWaitingForResponse(true);
    setLoadingResponse(true);
  
  
    const newMessage = {
      text: userInput,
      timestamp: new Date().toLocaleTimeString(),
    };
  
    // Add the new message to the current chat
    setMessages([...messages, newMessage]);
  
    // If there is a current question, update its message history
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
  
  console.log("query",querys)// Use the value from the input field as the query

    const requestBody = {
      query: querys
    };

    console.log("requestBody",requestBody)
    // Make an API request
    const headerObject = {
      'Content-Type':'application/json',
      "Accept":"*/*",
      }
      
    
    
    
   
    const dashboardsApi = "http://document-qa.apprikart.com/api/rag.qa_chain/run";

    axios.post( dashboardsApi,requestBody,{headers: headerObject})
      .then((response) => {
        console.log("API Response:", response);
   
        console.log("responsedata",response.data.output)
        const answer = response.data.output;
        console.log('Responseanswer:', answer);
        setApiResponse((prevResponse) => ({
          ...prevResponse,
          [querys]: answer,
        }));
        setLoadingResponse(false);
      })
      .catch((err) => {
        console.log("error", err);
        setApiResponse((prevResponse) => ({
          ...prevResponse,
          [querys]:"Internal Server Error",
        }));
        setLoadingResponse(false);
      })
      .finally(() => {
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

  return (
    <>
      <div className={`navbar ${inputFocused ? 'navbar-focused' : ''}`}>
        <div className='chat-parent-div'>
          <div style={{display:"flex",flexDirection:"row",gap:"10px",alignItems:"center"}} className='inner-chat-paarent-div'>
            <div>
            {/* <img src={Funding} alt="funding-icon" style={{width:"40px",height:"40px"}} /> */}
            </div>
            <div style={{color:"#21261B",fontWeight:"600",letterSpacing:"0.5px"}} className='document-text'>
             CHATBOT
            </div>
          </div>
          <div className='hamburger-button' onClick={hamburgerclose}>
            <img
              src={hamburger}
              alt="hamburger-icon"
              style={{ width: '60px', height: '60px' }}
              className='hamburger-icon'
            />
          </div>
        </div>



        <div className='clear-chat-parent-div'>
        <div className='new-chat-div-two' >logout</div>
          <div className='new-chat-div'  onClick={() => clearConversation()}  >
            + New Chat
          </div>
          <div
            className={`toggle-sidebar-button ${
              mobileSidebarOpen ? 'open' : ''
            }`}
            onClick={toggleMobileSidebar}
          >
            <img
              src={persontwo}
              alt='person-icon'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
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
              // onClick={() => selectChat('New Chat')}
              style={{textAlign:"center"}}
             >
              Question history
            </div>
            {/* </div> */}
          
            <div onClick={hamburgerdisappearing} className='hamburgerdisappearingicon'>
              <img src={close} alt="close-icon" style={{ width: "40px", height: "40px" }} />
            </div>
            
            </div>
            {/* <div className='clear-chat-button' onClick={() => clearQuestionHistory()}  style={{textAlign:"center",border:"1px solid white",width:"50%",marginLeft:"25%"}}>
  Clear Chat
</div> */}
            <div className='question-section' style={{flexBasis:"100%"}}>
            {questionOrder.map((question, index) => (
              <li
                key={index}
                // style={{padding:"10px",margin:"5px",cursor:"pointer"}}
                className={`chat-title ${
                  question === selectedChatTitle ? 'selected' : ''
                }`}
                onClick={() => {
                  // selectChat(question);
                  hamburgerdisappearing();
                }}
                style={{ padding: "5px" ,borderRadius:"5px",backgroundColor:"#191C14",marginTop:"10px",marginLeft:"10px",marginRight:"10px"}}
               >
                {question}
              </li>
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
                        hi,How can i assist you Today?
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
                    <div className='user-question-div'>{message.text}</div>
                  </div>
                  <div className='user-parent-output-div'>
                    <div className='user-timestamp-parent-div-two'>
                      <div className='chatbot-name-div'>BOT</div>
                      {/* <div className='chatbot-time-div'>{message.timestamp}</div> */}
                    </div>
                    <div className='chatbot-output-div'>
                    {loadingResponse && message.text === currentQuestion ?  <span className="loading-dots" /> : apiResponse[message.text] || ''}

        </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='user-input'>
            <input
              type='text'
              placeholder='Type your message..'
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyPress}
              style={{fontFamily:"Sora, sans-serif"}}
                />
            <button onClick={sendMessage} disabled={waitingForResponse}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Salesagentdashboard;