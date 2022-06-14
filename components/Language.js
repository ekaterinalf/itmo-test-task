import { useState } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import styles from '../styles/Language.module.css'

function Language(props) {
  let router = useRouter()
  const [language, setLanguage] = useState(router.locale)
  const [isVisibility, setIsVisibility] = useState(false)

  function changeLanguageHandler(e) {
    setLanguage(e.target.id)
  }
  function changeVisabilityHandler() {
    setIsVisibility(!isVisibility)
  }

  return (
  <div className={styles.langMenu}>
    <div className={styles.selectedLang} onClick={changeVisabilityHandler}>
     {
     language === 'ru'
     ? <span id={styles.ru}>Рус</span>
     : <span id={styles.en}>Eng</span>
     }
    </div>
    <ul style={isVisibility ? {display:'block'} : {display:'none'}}>
      {router.locales.map(locale => (
        <li key={locale} style={locale === language ? {backgroundColor:'#F2F4FF'} : null}>
          <Link href={router.asPath} locale={locale}>
            <a onClick={changeLanguageHandler}>{locale === 'ru' ? 'Рус' : 'Eng'}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default Language;
