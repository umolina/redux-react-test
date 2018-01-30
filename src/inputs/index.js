import React from 'react';
import styled from "styled-components";
import { Field, reduxForm } from 'redux-form'
import IntlTelInput from 'react-intl-tel-input';

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

let TextInputF = ({ input, label, type, autoComplete, meta: { touched, error, warning }, placeholder, className  }) => {
    return (
        <div className={className}>
            <FormInput {...input} placeholder={placeholder} type={type} autoComplete={autoComplete}/>
            <FormLabel>{label} {touched && ((error && <span>{error}</span>))}</FormLabel>
        </div>
    )
}

export let TextInput = styled(TextInputF)`
    width: 100%;
    position:relative;
`
