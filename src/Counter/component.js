import React from 'react';
import styled from "styled-components";

let Counter = ({ value, onClick, className }) => {
    return (
        <div className={className} onClick={onClick}>
            <p>{value}</p>
        </div>
    );
}

Counter = styled(Counter)`
    font-size: 20px;
    font-weight: bold;
    border: 1px solid;
    text-align: center;
    color: ${props => props.theme.main}; 
    
    @media (max-width: 700px) {
        background: yellow;
    }
`;

export default Counter