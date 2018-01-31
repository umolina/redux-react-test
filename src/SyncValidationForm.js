import React from 'react'
import PropTypes from 'prop-types';
import {Field, reduxForm, SubmissionError, getFormValues} from 'redux-form'
import styled from "styled-components";
import {Flex, Box} from 'grid-styled'
import {BrandButton} from './buttons'
import {TextInput, FormLabel} from './inputs'
import IntlTelInput from 'react-intl-tel-input';
import '../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import '../node_modules/react-intl-tel-input/dist/main.css';
import './inputs/phone.css';

import Phone, {isValidPhoneNumber} from 'react-phone-number-input';
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'

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


let renderPhoneNumber = ({input: {value, onChange}, label, meta: {touched, error, warning}, className}) => (
    <div className={className}>
        <FormLabel>{label} {(error && <span>{error}</span>)}</FormLabel>
        <IntlTelInput
            defaultCountry={'auto'}
            geoIpLookup={lookup}
            onPhoneNumberChange={onChange}
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

const PhoneInputT = props => {
    const {placeholder, input, meta, className, label} = props;
    const {onBlur, onChange, value} = input;
    const {error} = meta

    let onChangeX = (...args) => {
        onChange(args);
    };

    let onBlurX = (...args) => {
        onBlur(args);
    };

    return (
        <div className={className}>
            <FormLabel>{label} {(error && <span>{error}</span>)}</FormLabel>
            <IntlTelInput
                defaultCountry={'auto'}
                geoIpLookup={lookup}
                onPhoneNumberChange={onChangeX}
                onPhoneNumberBlur={onBlurX}
                css={['intl-tel-input', 'form-control']}
                utilsScript={'libphonenumber.js'}
                autoComplete={'tel'}
                fieldName={'tel'}
                label={label}
            />
        </div>
    );
};


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


const PhoneInput = props => {
    const {placeholder, input, meta, className} = props;
    const {onBlur, onChange, value} = input;
    const {error} = meta

    let dictionary = { ES: 'Spain (España) +34'};

    return (
        <div>
            <Phone
                className={className}
                country="US"
                placeholder={placeholder}
                onBlur={onBlurFn(onBlur)}
                //onBlur={onBlurWorkaroundFn(onBlur, value)}
                onChange={onChangeFn(onChange)}
                value={value}
                convertToNational
                indicateInvalid
                dictionary={dictionary}
            />
            {error}
        </div>
    );
};

const StyledPhoneInput = styled(PhoneInput)`
    font-size: 1rem;
    color: #333333;
    width: 100%;
    padding: 1.7rem 0.7rem 0.3rem 0.7rem;
    border: 0.1rem solid;
    border-color: #bbbbbb;
    position: relative;
    top: 0;
    left: 0;
    z-index: 0;
    background-color: #fff;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
`


let PhoneNumberInput = props => {
    const {input, label, meta, className} = props;
    const {touched, error, warning} = meta;

    return (
        <div className={className}>
            <StyledPhoneInput {...props} />
            <FormLabel>{label} {touched && ((error && <span>{error}</span>))}</FormLabel>
        </div>
    )
}

PhoneNumberInput = styled(PhoneNumberInput)`
    width: 100%;
    position:relative;
`


function onChangeFn(cb) {
    return value => {
        console.log('onChange', value);
        cb(value);
    };
}

function onBlurFn(cb) {
    return event => {
        console.log('onBlur', event.target.value);
        cb(event.target.value);
    };
}

const SyncValidationForm = (props) => {
    const {handleSubmit, pristine, reset, submitting, className} = props
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
                    <Field name="tel" type="tel" component={PhoneInputT} label="Phone number"/>
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