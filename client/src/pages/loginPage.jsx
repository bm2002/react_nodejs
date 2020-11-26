import React, { useState, useEffect } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Login } from '../redux/authReducer';
import { renderInput } from '../common/renders'
import ReCAPTCHA from 'react-google-recaptcha'
import { NavLink } from 'react-router-dom';
import Error from '../components/error';
import { Redirect } from 'react-router-dom'


const LoginPage = ({ handleSubmit, reset, errors, message, Login, isAuth }) => {

    const submit = formData => {
        // debugger
        Login(formData);
        // registerHandler(formData);
    }

    let [recaptcha, setRecaptcha] = useState(null);
    // const { loading, request, error, clearError } = useHttp()

    useEffect(() => {
        if (!errors) return;
        // reset();
        let timerFunc = setTimeout(() => {
            reset();
            Login(null);
        }, 3000);

        return () => clearTimeout(timerFunc);

    }, [errors, Login, reset]);


    // if (!!errors && isAuth) return <Redirect to='/profile' />

    const errorArray = []
    if (errors) {
        if (message) errorArray.push(message)
        errors.map((e) => errorArray.push(`"${e.param}" - ${e.msg}`))
        // debugger
    }

    // debugger
    return <>
        {isAuth
            ? <Redirect to='/profile' />
            :
            <div>
                <form style={{ width: '350px' }} className="form-signin" onSubmit={handleSubmit(formData => submit(formData))}>
                    <h1 className="h3 mb-3 font-weight-normal">Please login</h1>
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
                    </div>
                    <div
                    >
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

                    <div style={{ textDecoration: 'underline' }}>
                        <NavLink to='./register'>
                            Регистрация
                </NavLink>
                    </div>

                    {(errorArray.length !== 0) ? errorArray.map((e, index) => <Error key={index} errorText={e} />) : null}

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                        {/* <div> */}
                        <button
                            style={{ width: '150px' }}
                            className="btn btn-lg btn-primary btn-block"
                            type="submit"
                            disabled={!recaptcha || errors}
                        >LogIn
                        </button>
                    </div>
                </form>
            </div>
        }
    </>
}


let mapStateToProps = (state) => {
    return {
        errors: state.auth.errors,
        message: state.auth.message,
        isAuth: state.auth.isAuth
    }
}


export default reduxForm({
    form: 'loginform'
})
    (
        compose
            (
                connect(
                    mapStateToProps,
                    { Login }
                )
            )
            (LoginPage)
    )
