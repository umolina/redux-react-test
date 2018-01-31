import React from 'react'
import {Field, reduxForm, SubmissionError} from 'redux-form'
import styled from "styled-components";
import {Flex, Box} from 'grid-styled'
import {BrandButton} from './buttons'
import {TextInput, PhoneInput} from './inputs'


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
function submit(values) {
    return sleep(1000) // simulate server latency
        .then(() => {
            if (!['Unai', 'paul', 'george', 'ringo'].includes(values.first_name)) {
                throw new SubmissionError({username: 'User does not exist', _error: 'Login failed!'})
            } else if (values.password !== '123456') {
                throw new SubmissionError({password: 'Wrong password', _error: 'Login failed!'})
            } else {
                window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
            }
        })
}

// --- Validation Rules ----
const required = value => value ? undefined : 'Required'

const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined

const maxLength20 = maxLength(20)

const validEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined

const validPhone = value =>
    value && (false === value[0]) ?
        'Valid phone number required' : undefined


const validPassword = value =>
    value && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/i.test(value) ?
        'Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters' : undefined


let RegistrationForm = (props) => {
    const {handleSubmit, submitting, className} = props
    return (
        <form onSubmit={handleSubmit(submit)} className={className}>
            <Flex wrap className='bold'>
                <Box width={1/2} p={1}>
                    <Field name="email" type="email"
                           component={TextInput} label="Email"
                           validate={[required, validEmail]}
                    />
                </Box>
                <Box width={1/2} p={1}>
                    <Field name="first_name" type="text"
                           component={TextInput} label="First name"
                           validate={[required, maxLength20]}
                    />
                </Box>
                <Box width={1/2} p={1}>
                    <Field name="tel" type="tel"
                           component={PhoneInput} label="Phone number"
                           validate={[required, validPhone]}
                    />
                </Box>
                <Box width={1/2} p={1}>
                    <Field name="password" type="password"
                           component={TextInput} label="Password"
                           autoComplete='new-password'
                           validate={[required, validPassword, maxLength20]}
                    />
                </Box>

                <Box width={1} p={1}>
                    <BrandButton type="submit" disabled={submitting}>Start my free trial</BrandButton>
                </Box>

            </Flex>
        </form>
    )
}

RegistrationForm = styled(RegistrationForm)`
    font-weight: bold;
    background-color: pink;
`


export default reduxForm({
    form: 'syncValidation',  // a unique identifier for this form
})(RegistrationForm)