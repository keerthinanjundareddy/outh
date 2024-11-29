
export const checkSelectedLanguage=()=>{
    let selectedLang = localStorage.getItem("selectedLang")
    if(selectedLang){
        return true
    }
    else{
        return false
    }
    
}