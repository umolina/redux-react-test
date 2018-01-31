import React from 'react';
import styled from "styled-components";

export const BrandButton = styled.button`
    font-size: 1rem;
    width: 100%;
    min-width: auto;
    max-width: 100%;
    float: none;
    border-right: 0 solid;
    border-left: 0 solid;
    border-top: 0 solid;
    border-bottom: 0 solid;
    border: 0.1rem solid;
    color: ${props => props.theme.button_text_color};
    border-color: ${props => props.theme.brand_color_main};
    background-color: ${props => props.theme.brand_color_main};
    padding: 1.35rem 3rem 1.35rem 3rem;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 0px;
    cursor: pointer;
    display: block;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    height: auto;
    text-align: center;
    font-weight: normal;
    border-radius: 0px;
    line-height: inherit;
`;
