import React from 'react'
import {Field, reduxForm, SubmissionError, Form, propTypes} from 'redux-form'
import { connect } from 'react-redux'
import styled from "styled-components"
import {Flex, Box} from 'grid-styled'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {BrandButton} from './buttons'
import {TextInput, PhoneInput} from './inputs'
import { required, email, length, format, presence } from 'redux-form-validators'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
function submit(values) {
    return sleep(1000) // simulate server latency
        .then(() => {
            if (!['Unai', 'paul', 'george', 'ringo'].includes(values.first_name)) {
                throw new SubmissionError({username: 'User does not exist', _error: 'Login failed!'})

            } else if (values.password !== 'Amorebieta1') {
                throw new SubmissionError({password: 'Wrong password', _error: 'Login failed!'})
            } else {
                window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
            }
        })
}

// --- Validation Rules ----

const validPhone = value =>
    value && (false === value[0]) ?
        'Valid phone number required' : undefined


let RegistrationForm = (props) => {
    const {handleSubmit, submitting, className, translate, currentLanguage} = props

    return (
        <Form onSubmit={handleSubmit(submit)} className={className}>
            <Flex wrap className='bold'>
                <Box width={1/2} p={1}>
                    <Field name="email" type="email"
                           component={TextInput} label={ translate('labels.email') }
                           validate={[
                               required({msg: translate('input_errors.required')}),
                               email({msg: translate('input_errors.email')})
                           ]}
                    />
                </Box>
                <Box width={1/2} p={1}>
                    <Field name="first_name" type="text"
                           component={TextInput} label={ translate('labels.first_name') }
                           validate={[
                               required({msg: translate('input_errors.required')}),
                               length({ max: 20, msg: translate('input_errors.max_length')})
                           ]}
                    />
                </Box>
                <Box width={1/2} p={1}>
                    <Field name="tel" type="tel"
                           component={PhoneInput} label={ translate('labels.phone_number') }
                           validate={[
                               required({msg: translate('input_errors.required')}),
                               validPhone
                           ]}
                    />
                </Box>
                <Box width={1/2} p={1}>
                    <Field name="password" type="password"
                           component={TextInput} label={ translate('labels.password') }
                           autoComplete='new-password'
                           validate={[
                               required({msg: translate('input_errors.required')}),
                               format({ with: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/i, message: translate('input_errors.password') }),
                               length({ max: 30, msg: translate('input_errors.max_length') })
                           ]}
                    />
                </Box>

                <Box width={1} p={1}>
                    <BrandButton type="submit" disabled={submitting}>Start my free trial</BrandButton>
                </Box>

            </Flex>
        </Form>
    )
}

RegistrationForm = styled(RegistrationForm)`
    font-weight: bold;
    background-color: pink;
`


const mapStateToProps = state => ({
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code,
})

RegistrationForm = connect(mapStateToProps)(RegistrationForm)

export default reduxForm({
    form: 'syncValidation',  // a unique identifier for this form
})(RegistrationForm)