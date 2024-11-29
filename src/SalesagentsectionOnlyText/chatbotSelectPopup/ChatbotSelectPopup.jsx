import React from 'react'
import styles from '../languagePopup/languagePopup.module.css'
import { useNavigate } from 'react-router-dom'

export default function ChatbotSelectPopup({onClose, setSelectedLang}) {
const navigate = useNavigate()
    function handleLangSelect(mode){
        if(mode ==="text"){
            navigate("/chatbot-text")
        }
        else{
            navigate("/chatbot")
        }
        onClose()
    }
  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <span className={styles.heading}>Please select input mode</span>
                <div className={styles.btnSection}>
                    <button onClick={()=>handleLangSelect("text")}>Text</button>
                    <button onClick={()=>handleLangSelect("audio")}>Audio</button>
                </div>  
        </div>

    </div>
  )
}
