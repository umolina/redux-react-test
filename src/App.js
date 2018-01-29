import React, {Component} from 'react'
import Counter from './Counter/index'
import styled from 'styled-components'
import {ThemeProvider} from 'styled-components'
import SyncValidationForm from "./SyncValidationForm"
import NavBar from "./NavBar";
import theme from "./themes/hfe";
import lhs_theme from "./themes/lhs";

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
                <ThemeProvider theme={lhs_theme}>
                    <Counter/>
                </ThemeProvider>
                <Title>Simple Form</Title>
                <SyncValidationForm/>
            </div>
        );
    }
}

export default App;
