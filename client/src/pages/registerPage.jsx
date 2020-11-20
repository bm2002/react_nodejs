import React, { useState, useEffect } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Register } from '../redux/authReducer';
import { renderInput } from '../common/renders'
import ReCAPTCHA from 'react-google-recaptcha'
// import { useHttp } from '../hooks/http'

// const Register = (props) => {
//     // debugger
//     const onSubmit = (formData) => {
//         // console.log(formData);
//         props.RegisterAC();
//     }

//     return (
//         <RegisterPageReduxForm
//             onSubmit={onSubmit}
//             errors={props.errors}
//         />
//     )
// }

const RegisterPage = ({ handleSubmit, reset, errors, Register }) => {

    const submit = formData => {
        Register(formData);
        // registerHandler(formData);
    }

    let [recaptcha, setRecaptcha] = useState(null);
    // const { loading, request, error, clearError } = useHttp()

    useEffect(() => {
        if (!errors) return;
        // reset();
        let timerFunc = setTimeout(() => {
            reset();
            Register(null);
        }, 3000);

        return () => clearTimeout(timerFunc);

    }, [errors, Register, reset]);

    // const registerHandler = async (formData) => {
    //     try {
    //         debugger
    //         try {
    //             // const data = await request('http://localhost:3002/api/auth/register', 'POST', formData)
    //             const data = await request('http://localhost:3002/api/auth/test', 'GET')
    //             debugger
    //         } catch (e){
    //             console.log(e.message)
    //         }
    //         // message(data.message)
    //     } catch (e) { console.log(e.message) }
    // }
    // debugger
    if (!!errors && errors.status) return <div>Регистрация прошла успешно!</div>

    const errorArray = []
    if (errors) {
        errorArray.push(errors.message)
        errors.errors.map((e) => errorArray.push(`"${e.param}" - ${e.msg}`))
        // debugger
    }

    // let errorMessage
    // if (errors) {
    //     errorMessage = errorMessage + `<div className='alert alert-danger'>${errors.message}</div>`
    //     // errors.errors.map((e) => errorArray.push(`"${e.param}" - ${e.msg}`))
    //     debugger
    // }

    // debugger

    return (<div>
        {/* <form className="form-signin" onSubmit={handleSubmit}> */}
        <form className="form-signin" onSubmit={handleSubmit(formData => submit(formData))}>
            <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
            <div>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <Field
                    component={renderInput}
                    name="email"
                    placeholder="Email address"
                    autoFocus={true}
                    type='text'
                />

                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <Field
                    component={renderInput}
                    name="password"
                    placeholder="Password"
                    autoFocus={false}
                    type='password'
                />
                <label htmlFor="inputConfirmPassword" className="sr-only">Password</label>
                <Field
                    component={renderInput}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    autoFocus={false}
                    type='password'
                />
            </div>
            <div id="recaptchaContainer" style={{ marginLeft: '-33px', marginBottom: '-50px', marginTop: '-50px', transform: 'scale(0.7)', transformOrigin: '0 0', display: 'flex', justifyContent: 'left' }}>
                <ReCAPTCHA
                    name="recaptcha"
                    sitekey="6Lcz1dwZAAAAAMukUlBQzd1GE1JNJuhA-QZP8QcC"
                    // theme="dark"
                    size='normal'
                    onChange={(value) => {
                        setRecaptcha(value)
                    }}
                />
            </div>

            {(errorArray.length !== 0) ? errorArray.map((e, index) => <div key={index} className='alert alert-danger'>{e}</div>) : null}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    style={{ width: '250px' }}
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                    disabled={!recaptcha || errors}
                // onClick={dispatch(reset('registerform'))}
                // style={{ width: '250px' }}
                >Register
            </button>
            </div>
        </form>
    </div>
    )
}


let mapStateToProps = (state) => {
    return {
        errors: state.auth.errors
    }
}


export default reduxForm({
    form: 'registerform'
})
    (
        compose
            (
                connect(
                    mapStateToProps,
                    { Register }
                )
            )
            (RegisterPage)
    )
