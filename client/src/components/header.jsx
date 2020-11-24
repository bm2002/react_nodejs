import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import { CheckAuth, Logout } from '../redux/authReducer'
import LanguageSwitcher from './languageSwitcher';

const Header = ({ isAuth, user, CheckAuth, Logout }) => {

    useEffect(() => {
        // console.log(localStorage.token)
        if (localStorage.token) {
            CheckAuth(localStorage.token)
        }
    }, [isAuth, CheckAuth]);

    const logout = (e) =>{
        e.preventDefault()
        Logout()
    }

    // debugger
    return <div className="header">
        {isAuth
            ? user.email
            : 'not auth'
        }
        &nbsp;&nbsp;

        {isAuth
            ? <Link
                to='/'
                style={{ textDecoration: 'underline' }}
                role='button'
                onClick={(e) => {logout(e)}}
            >
                LogOut
            </Link>
            : <NavLink to='/Login' style={{ textDecoration: 'underline' }}>Login</NavLink>
        }
        <br />
        <LanguageSwitcher />
    </div>
}

const mapPropsToState = (state) => {
    return {
        isAuth: state.auth.isAuth,
        user: state.auth.user
    }
}

export default connect(
    mapPropsToState,
    { CheckAuth, Logout }
)(Header)