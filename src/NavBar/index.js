import React from 'react'
import styled from 'styled-components'

let Button = ({className, label, onClick}) => {
    return (
        <button
            className={className}
            onClick={onClick}>{label}
        </button>
    )
}

Button = styled(Button)`
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
`

const StyledItem = styled.li`
    display: inline-block;
    padding: 5px;
`

let NavigationItem = ({className, label}) => {
    return (
        <StyledItem className={className}>
            <Button label={label}/>
        </StyledItem>
    )
}

const StyledList = styled.ul`
    position: relative;
    text-align: right;
    border-style: double;
`

let NavigationList = () => {
    return (
        <StyledList>
            <NavigationItem label="Start my free trial"/>
            <NavigationItem label="Login"/>
        </StyledList>
    )
}


let Logo = styled.img`
    float: left;
    padding: 5px;
`

let NavBar = ({loggedIn}) => {
    return (
        <nav>
            <div>
                <Logo src="logo.png" alt="logo"/>
                <NavigationList/>
            </div>
        </nav>
    )
}

export default NavBar