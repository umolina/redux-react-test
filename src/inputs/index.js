import React from 'react';
import styled from "styled-components";
import IntlTelInput from 'react-intl-tel-input';
import '../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import '../../node_modules/react-intl-tel-input/dist/main.css';
import './phone.css';


const FormInput = styled.input`
    font-size: 1rem;
    color: #333333;
    width: 100%;
    padding: 2rem 0.7rem 0.7rem 0.7rem;
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

export const FormLabel = styled.label`
    color: #999999;
    font-size: 0.8125rem;
    position: absolute;
    top: 0.5rem;
    left: 0.7rem;
    z-index: 1;
`

let TextInputComponent = ({ input, label, type, autoComplete, meta: { touched, error, warning }, placeholder, className  }) => {
    return (
        <div className={className}>
            <FormInput {...input} placeholder={placeholder} type={type} autoComplete={autoComplete}/>
            <FormLabel>{label} {touched && ((error && <span>{error}</span>))}</FormLabel>
        </div>
    )
}

export let TextInput = styled(TextInputComponent)`
    width: 100%;
    position:relative;
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

let PhoneInputComponent = props => {
    const {input, meta, className, label} = props;
    const {onBlur, onChange} = input;
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

export let PhoneInput = styled(PhoneInputComponent)`
    width: 100%;
    position:relative;
`