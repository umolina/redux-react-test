import React, {Component} from 'react'
import Counter from './Counter/index'
import styled from 'styled-components'
import {ThemeProvider} from 'styled-components'
import Hide from 'hidden-styled'
import RegistrationForm from "./RegistrationForm"
import NavBar from "./NavBar";
import theme from "./themes/lhs";
import {BrandButton} from './buttons'

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <Title>Counter Example</Title>
                <ul>
                    <li>Click inside dev below to increment counter</li>
                    <li>Theme defined at top level with styled-components</li>
                    <li>Yellow background on mobile or tablet</li>
                </ul>
                <Counter/>
                <ThemeProvider theme={theme}>
                    <Counter/>
                </ThemeProvider>
                <Title>Simple Form</Title>
                <Hide xs>
                    <RegistrationForm/>
                </Hide>
                <Hide sm md lg>
                    <BrandButton type="submit">Start my free trial</BrandButton>
                </Hide>
                <ul>
                    <li>Registration Form</li>
                </ul>
            </div>
        );
    }
}

export default App;
