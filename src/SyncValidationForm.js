import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styled from "styled-components";
import { Flex, Box } from 'grid-styled'
import { BrandButton } from './buttons'
import { TextInput, PhoneNumberInput } from './inputs'
import IntlTelInput from 'react-intl-tel-input';
import '../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import '../node_modules/react-intl-tel-input/dist/main.css';
import './inputs/phone.css';

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
            <Flex wrap className='bold'>
                <Box width={1/2} p={1}>
                    <Field name="email" type="email" component={TextInput} label="Email"/>
                </Box>
                <Box width={1/2} p={1}>
                    <Field name="first_name" type="text" component={TextInput} label="First name"/>
                </Box>
                <Box width={1/2} p={1}>
                    <IntlTelInput
                        preferredCountries={['es']}
                        css={ ['intl-tel-input', 'form-control'] }
                        utilsScript={ 'libphonenumber.js' }
                    />
                </Box>
                <Box width={1/2} p={1}>
                    <Field name="password" type="password" component={TextInput} label="Password"/>
                </Box>

                <Box width={1} p={1}>
                    <BrandButton type="submit" disabled={submitting}>Start my free trial</BrandButton>
                </Box>

            </Flex>
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