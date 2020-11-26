import React, {useContext} from 'react'
// import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LanguageContext } from '../../src/context/language'

const LanguageSwitcher = () => {

    const state = useContext(LanguageContext)
    // debugger
    const languges = ['Ru', 'En']
    const language = state.language

    const changeLanguage = (e) =>{
        e.preventDefault()
        // localStorage.setItem('language', e.target.text.trim())
        state.setLanguage(e.target.text.trim())
        // changeLanguageAC(e.target.text.trim())
    }

    return (
        <>
            {
                languges.map((l, index) => {
                    // debugger
                    if (l === language) {
                        return <span key={index} style={{ fontWeight: 'bold' }}>{l} </span>
                    } else {
                        return <NavLink  
                            key={index}
                            style={{ textDecoration: 'underline' }}
                            to='/'
                            // role='button'
                            onClick={(e) => { changeLanguage(e) }}
                        >
                            {l}&nbsp;
                        </NavLink>
                    }
                })
            }
        </>
    )
}

export default LanguageSwitcher

//language: state.app.language

// const mapStateToProps = (state) =>{
//     return{
//         language: state.app.language
//     }
// }

// export default connect(mapStateToProps, {changeLanguageAC})(LanguageSwitcher)