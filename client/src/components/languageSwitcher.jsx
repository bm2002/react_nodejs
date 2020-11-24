import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {changeLanguageAC} from '../redux/appReducer'

const LanguageSwitcher = ({language, changeLanguageAC}) => {

    const languges = ['Ru', 'En']

    const changeLanguage = (e) =>{
        e.preventDefault()
        localStorage.setItem('language', e.target.text.trim())
        changeLanguageAC(e.target.text.trim())
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
                            role='button'
                            onClick={(e) => { changeLanguage(e) }}
                        >
                            {l}&nbsp;
                        </NavLink>
                    }
                })
            }
            {/* {languges.map(l, index) => {l}} */}
            {/* <span>Ru</span> */}
        </>
    )
}

//language: state.app.language

const mapStateToProps = (state) =>{
    return{
        language: state.app.language
    }
}

export default connect(mapStateToProps, {changeLanguageAC})(LanguageSwitcher)