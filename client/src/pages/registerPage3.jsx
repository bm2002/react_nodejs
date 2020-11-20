import React from 'react'
import { Field, reduxForm } from 'redux-form'

const onSubmit = (formData) =>{
    
    console.log(formData)
    debugger
  }

let ContactForm = ({handleSubmit}) => {
  // const { handleSubmit } = props

  


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

ContactForm = reduxForm({
  // a unique name for the form
  form: 'contact',
  onSubmit
})(ContactForm)

export default ContactForm