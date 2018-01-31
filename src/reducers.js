import { combineReducers } from 'redux'
import counter from './Counter/reducers'
import { reducer as formReducer } from 'redux-form'
import { localeReducer as locale } from 'react-localize-redux'

const rootReducer = combineReducers({
    counter,
    form: formReducer,
    locale,
})

export default rootReducer
