import React from 'react';
import styled from "styled-components";

export const BrandButton = styled.button`
    font-size: 1rem;
    width: 100%;
    min-width: auto;
    float: none;
    border: 0.1rem solid;
    color: ${props => props.theme.button_text_color};
    border-color: ${props => props.theme.brand_color_main};
    background-color: ${props => props.theme.brand_color_main};
    padding: 1.35rem 3rem 1.35rem 3rem;
    margin: 0;
    cursor: pointer;
    display: block;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    text-align: center;
`;
