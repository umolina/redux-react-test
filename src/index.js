import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from './App';
import rootReducer from './reducers'
import {ThemeProvider} from 'styled-components'
import theme from './themes/lhs'
import { initialize, addTranslation } from 'react-localize-redux'

let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


const translationData = {
    labels: {
        email: [
            'Email',
            'FR - Email',
        ],
        first_name: [
            'First name',
            'FR - First name',
        ],
        phone_number: [
            'Phone number',
            'FR - Phone number',
        ],
        password: [
            'Password',
            'FR - Password',
        ],
    },
    input_errors: {
        required: [
            'Required field',
            'FR - Required field',
        ],
        password: [
            'Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters',
            'FR - Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters'
        ],
        email: [
            'Invalid email',
            'FR - Invalid email',
        ],
        max_length: [
            'Max length exceeded',
            'FR - Max length exceeded',
        ],
    }
};

const languages = ['en', 'fr'];

store.dispatch(initialize(languages, { defaultLanguage: 'en' }))
store.dispatch(addTranslation(translationData))


render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>,

    document.getElementById('root')
)
