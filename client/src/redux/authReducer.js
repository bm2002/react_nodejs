import { authAPI } from '../api/api'


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

export const LoginAC = (response) => ({
    type: 'LOGIN',
    response
})


export const Login = (data) =>
    async (dispatch) => {
        if (data) {
            let response = await authAPI.login(data)
            if (response.token) localStorage.setItem('token', response.token)
            dispatch(LoginAC(response));
        } else {
            dispatch(LoginAC(null));
        }
    }


let initialState = {
    errors: null,
    isAuth: false,
    authUserId: null,
    user: null
}

let authReducer = (state = initialState, action) => {
    // debugger;
    switch (action.type) {
        case 'REGISTER': {
            return { ...state, errors: action.response }
        }
        case 'LOGIN': {
            // debugger
            return {
                ...state,
                isAuth: !action.response ? null : action.response.status,
                authUserId: !action.response ? null : action.response.status ? action.response.userId : null,
                errors: action.response
            }
        }
        default: return state;
    }

}


export default authReducer;