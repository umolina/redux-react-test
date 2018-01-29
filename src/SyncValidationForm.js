import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styled from "styled-components";

const validate = values => {
    const errors = {}

    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    return errors
}

let textField = ({ input, label, type, meta: { touched, error, warning }, className }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className={className}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

textField = styled(textField)`
    background-color: green;
`

let emailField = ({ input, label, type, meta: { touched, error, warning }, className }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className={className}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

emailField = styled(emailField)`
    background-color: blue;
`


const SyncValidationForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, className } = props
    return (
        <form onSubmit={handleSubmit} className={className}>
            <Field name="username" type="text" component={textField} label="Username"/>
            <Field name="email" type="email" component={emailField} label="Email"/>
            <Field name="age" type="number" component={textField} label="Age"/>
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

let StyledSyncValidationForm = styled(SyncValidationForm)`
    font-weight: bold;
    background-color: pink;
`


export default reduxForm({
    form: 'syncValidation',  // a unique identifier for this form
    validate,                // <--- validation function given to redux-form
})(StyledSyncValidationForm)