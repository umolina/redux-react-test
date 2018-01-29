import { combineReducers } from 'redux'
import counter from './Counter/reducers'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    counter,
    form: formReducer,
})

export default rootReducer
