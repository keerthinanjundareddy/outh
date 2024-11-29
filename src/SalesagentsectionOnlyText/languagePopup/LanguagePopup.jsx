import React from 'react'
import styles from './languagePopup.module.css'

export default function LanguagePopup({onClose, setSelectedLang}) {

    function handleLangSelect(lang){
        localStorage.setItem("selectedLang", lang)
        setSelectedLang(lang)
        onClose()
    }
  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <span className={styles.heading}>Please select your preferred language</span>
                <div className={styles.btnSection}>
                    <button onClick={()=>handleLangSelect("english")}>English</button>
                    <button onClick={()=>handleLangSelect("hindi")}>हिन्दी</button>
                </div>  
        </div>

    </div>
  )
}
