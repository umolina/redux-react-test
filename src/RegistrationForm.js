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



const validate = values => {
    const errors = {}

    if (!values.first_name) {
        errors.first_name = 'Required'
    } else if (values.first_name.length > 15) {
        errors.first_name = 'Must be 15 characters or less'
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (values.tel && (false === values.tel[0])) {
        errors.tel = 'Valid number required'
    }

    return errors
}

let RegistrationForm = (props) => {
    const {handleSubmit, submitting, className} = props
    return (
        <form onSubmit={handleSubmit(submit)} className={className}>
            <Flex wrap className='bold'>
                <Box width={1 / 2} p={1}>
                    <Field name="email" type="email" component={TextInput} label="Email"/>
                </Box>
                <Box width={1 / 2} p={1}>
                    <Field name="first_name" type="text" component={TextInput} label="First name"/>
                </Box>
                <Box width={1 / 2} p={1}>
                    <Field name="tel" type="tel" component={PhoneInput} label="Phone number"/>
                </Box>
                <Box width={1 / 2} p={1}>
                    <Field name="password" type="password" component={TextInput} label="Password"
                           autoComplete='new-password'/>
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
    validate,                // <--- validation function given to redux-form
})(RegistrationForm)