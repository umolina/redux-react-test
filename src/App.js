import React, {Component} from 'react'
import Counter from './Counter/index'
import styled from 'styled-components'
import {ThemeProvider} from 'styled-components'
import { Flex, Box } from 'grid-styled'
import SyncValidationForm from "./SyncValidationForm"
import NavBar from "./NavBar";
import theme from "./themes/hfe";
import lhs_theme from "./themes/lhs";
import { BrandButton } from './buttons'
import { TextInput } from './inputs'

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
                <ul>
                    <li>Registration Form</li>
                </ul>
            </div>
        );
    }
}

/*
<Flex wrap className='bold'>
    <Box width={1/2} p={1}>
        <TextInput label="Email address"/>
    </Box>
    <Box width={1/2} p={1}>
        <TextInput label="First name"/>
    </Box>

    <Box width={1/2} p={1}>
        <TextInput label="Phone number"/>
    </Box>
    <Box width={1/2} p={1}>
        <TextInput label="Password"/>
    </Box>

    <BrandButton>Start free trial</BrandButton>
</Flex>
*/


export default App;
