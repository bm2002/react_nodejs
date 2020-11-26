import React, { useState } from 'react'

export const LanguageContext = React.createContext({
  language: localStorage.language ?? 'Ru',
  setLanguage: () => {}
})

export const LanguageContextProvider = (props) => {

  const setLanguage = (language) => {
    localStorage.setItem('language', language)
    setState({...state, language: language})
  }

  const initState = {
    language: localStorage.language ?? 'Ru',
    setLanguage: setLanguage
  } 

  const [state, setState] = useState(initState)

  return (
    <LanguageContext.Provider value={state}>
      {props.children}
    </LanguageContext.Provider>
  )
}