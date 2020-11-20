import { authAPI } from '../api/api'


export const RegisterAC = (errors) => ({
    type: 'Register',
    errors
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


let initialState = {
    errors: null
}

let authReducer = (state = initialState, action) => {
    // debugger;
    switch (action.type) {
        case 'Register': {
            return { ...state, errors: action.errors }
        }
        default: return state;
    }

}


export default authReducer;