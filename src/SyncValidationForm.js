import React from 'react'
import {Field, reduxForm} from 'redux-form'
import styled from "styled-components";
import {Flex, Box} from 'grid-styled'
import {BrandButton} from './buttons'
import {TextInput, FormLabel} from './inputs'
import IntlTelInput from 'react-intl-tel-input';
import '../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import '../node_modules/react-intl-tel-input/dist/main.css';
import './inputs/phone.css';

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

    if (false === values.tel) {
        errors.tel = 'Valid number required'
    }

    console.log(values)
    console.log(errors)

    return errors
}

let textField = ({input, label, type, autoComplete, meta: {touched, error, warning}, className}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className={className} autoComplete={autoComplete}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

textField = styled(textField)`
    background-color: green;
`

let emailField = ({input, label, type, meta: {touched, error, warning}, className}) => (
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

const loadJSONP = (url, callback) => {
    const ref = window.document.getElementsByTagName('script')[0];
    const script = window.document.createElement('script');
    script.src = `${url + (url.indexOf('?') + 1 ? '&' : '?')}callback=${callback}`;
    ref.parentNode.insertBefore(script, ref);
    script.onload = () => {
        script.remove();
    };
};

const lookup = (callback) => {
    loadJSONP('http://ipinfo.io', 'sendBack');
    window.sendBack = (resp) => {
        const countryCode = (resp && resp.country) ? resp.country : '';
        callback(countryCode);
    }
};

const phoneHandler = (status, value, countryData, number, id) => {
    console.log(status, value, countryData, number, id);
};


let renderPhoneNumber = ({input: {onChange, value}, label, meta: {touched, error, warning}, className}) => (
    <div className={className}>
        <FormLabel>{label} {(error && <span>{error}</span>)}</FormLabel>
        <IntlTelInput
            defaultCountry={'auto'}
            geoIpLookup={lookup}
            onPhoneNumberBlur={onChange}
            css={['intl-tel-input', 'form-control']}
            utilsScript={'libphonenumber.js'}
            autoComplete={'tel'}
            fieldName={'tel'}
            label={label}
        />
    </div>
)

renderPhoneNumber = styled(renderPhoneNumber)`
    width: 100%;
    position:relative;
`

const SyncValidationForm = (props) => {
    const {handleSubmit, pristine, reset, submitting, className} = props
    return (
        <form onSubmit={handleSubmit} className={className}>
            <Flex wrap className='bold'>
                <Box width={1 / 2} p={1}>
                    <Field name="email" type="email" component={TextInput} label="Email"/>
                </Box>
                <Box width={1 / 2} p={1}>
                    <Field name="first_name" type="text" component={TextInput} label="First name"/>
                </Box>
                <Box width={1 / 2} p={1}>
                    <Field name="tel" type="tel" component={renderPhoneNumber} label="Phone number"/>
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

let StyledSyncValidationForm = styled(SyncValidationForm)`
    font-weight: bold;
    background-color: pink;
`


export default reduxForm({
    form: 'syncValidation',  // a unique identifier for this form
    validate,                // <--- validation function given to redux-form
})(StyledSyncValidationForm)