import React, { useState, useEffect } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Login } from '../redux/authReducer';
import { renderInput } from '../common/renders'
import ReCAPTCHA from 'react-google-recaptcha'
import { NavLink } from 'react-router-dom';
import Error from '../components/error';
// import { useHttp } from '../hooks/http'

const LoginPage = ({ handleSubmit, reset, errors, Login }) => {

    const submit = formData => {
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


    if (!!errors && errors.status) return <div>Вы успешно залогинились!</div>

    const errorArray = []
    if (errors) {
        errorArray.push(errors.message)
        errors.errors.map((e) => errorArray.push(`"${e.param}" - ${e.msg}`))
        // debugger
    }

    return (<div>
        {/* <form className="form-signin" onSubmit={handleSubmit}> */}
        <form className="form-signin" onSubmit={handleSubmit(formData => submit(formData))}>
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
            // id="recaptchaContainer"
            // style={{ marginLeft: '-33px', marginBottom: '-50px', marginTop: '-50px', transform: 'scale(0.7)', transformOrigin: '0 0', display: 'flex', justifyContent: 'left' }}
            // style={{ transform: 'scale(0.7)', transformOrigin: '0 0', backgroundColor: 'red'}}
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

            <div style={{textDecoration: 'underline'}}>
                <NavLink to='./register'>
                    Регистрация
                </NavLink>
            </div>

            {(errorArray.length !== 0) ? errorArray.map((e, index) => <Error key={index} errorText={e} />) : null}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                <button
                    style={{ width: '250px' }}
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                    disabled={!recaptcha || errors}
                >LogIn
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
                    { Login }
                )
            )
            (LoginPage)
    )
