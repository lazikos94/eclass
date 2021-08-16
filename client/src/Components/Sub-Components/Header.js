import React from 'react'
import styles from '../Styles/Header.module.css'
import useMain from '../context/main-context';
import de from '../Assets/Images/german.png';
import gr from '../Assets/Images/greek.png';
import en from '../Assets/Images/english.png';
import { dictionaryList } from '../configs/language/languages';
import ReactLanguageSelect from 'react-languages-select';
import 'react-languages-select/css/react-languages-select.css';

const lang_images = {
    de,
    gr,
    en
}

const languages=[
    'de',
    'gr',
    'en'
]

function Header() {
    const { language, setLanguage, globalState} = useMain();

    const click = (input)=>{
        if(input==='gr'){
            window.localStorage.setItem('cruise-language', 'gr');
            setLanguage({
                userLanguage:'gr',
                dictionary:dictionaryList['gr']
            })
        }else if(input ==='en'){
            window.localStorage.setItem('cruise-language', 'en');
            setLanguage({
                userLanguage:'en',
                dictionary:dictionaryList['en']
            })
        }else{
            window.localStorage.setItem('cruise-language', 'de');
            setLanguage({
                userLanguage:'de',
                dictionary:dictionaryList['de']
            }) 
        }
        
    }
    const lang_options = languages.map((language,key)=>{
        if(language!=language.userLanguage){
            return <img src={lang_images[language]} key={language} alt={language} style={{height:'40px',width:'40px'}} onClick={()=>click(language)}/>
        }
    })
    return (
        <div className={styles['Header-Container']}>
            <div className={styles['Header-Logo']}>
                <h1>LOGO</h1>
            </div>
            <div className={styles['Header-Stuff']}>
                <div className={styles['Header-Lang']}>
                    <div style={{width:'auto',height:'auto'}}>
                        <img src={lang_images[language.userLanguage]} style={{height:'40px',width:'40px'}} alt={language.userLanguage}/>
                    </div>
                    <div className={styles['Header-Dropdown']}>
                        {lang_options}
                    </div> 
                </div>              
            </div>
        </div>
    )
}

export default Header
