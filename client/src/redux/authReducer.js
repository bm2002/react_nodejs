import { authAPI } from '../api/api'
import jwt from "jsonwebtoken";

export const RegisterAC = (response) => ({
    type: 'REGISTER',
    response
})


export const Register = (data) =>
    async (dispatch) => {
        if (data) {
            let response = await authAPI.register(data)
            dispatch(RegisterAC(response));

        } else {
            dispatch(RegisterAC(null));
        }
    }



const getUserAC = (user) => ({
    type: 'GET_USER_DATA',
    user
})

export const CheckAuth = (token) => async (dispatch) => {

    if (token) {
        const decoded = await jwt.decode(token);
        if (Date.now() < decoded.exp * 1000) {
            let response = await authAPI.getUser(decoded.userId)
            dispatch(getUserAC(response));
        } else {
            dispatch(LoginAC(null));
        }
    }
    else {
        dispatch(LoginAC(null));
    }
}

const LoginAC = (response) => ({
    type: 'LOGIN',
    response
})

export const Logout = (data) => (dispatch) => {
    localStorage.removeItem('token')
    dispatch(LoginAC(null));
}

export const Login = (data) =>
    async (dispatch) => {
        if (data) {
            // debugger
            let response = await authAPI.login(data)
            if (response.status) {
                if (response.token) {
                    localStorage.setItem('token', response.token)
                }
                // CheckAuth(response.token)
                const decoded = await jwt.decode(response.token);
                if (Date.now() < decoded.exp * 1000) {
                    let response2 = await authAPI.getUser(decoded.userId)
                    dispatch(getUserAC(response2));
                } else {
                    dispatch(LoginAC(null));
                }
            }
            else {
                dispatch(LoginAC(response));
            }
        } else {
            dispatch(LoginAC(null));
        }
    }


let initialState = {
    errors: null,
    isAuth: false,
    authUserId: null,
    user: null,
    message: null
}

let authReducer = (state = initialState, action) => {
    // debugger;
    switch (action.type) {
        case 'REGISTER': {
            if (action.response) {
                return {
                    ...state,
                    errors: action.response.errors,
                    message: action.response.message,
                    user: null,
                }
            } else {
                return {
                    ...state,
                    errors: null,
                    message: null
                }
            }

        }
        case 'GET_USER_DATA': {
            return {
                ...state,
                user: action.user,
                isAuth: true,
                authUserId: action.user._id,
                errors: null
            }
        }
        case 'LOGIN': {   //only errors!
            if (action.response) {
                return {
                    ...state,
                    isAuth: false,
                    authUserId: null,
                    errors: action.response.errors,
                    message: action.response.message,
                    user: null,
                }
            } else {
                return {
                    ...state,
                    errors: null,
                    isAuth: false,
                    authUserId: null,
                    user: null,
                    message: null
                }
            }
        }
        default: return state;
    }

}


export default authReducer;