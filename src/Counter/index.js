import React from 'react';
import {connect} from "react-redux";
import {increment} from "./actions";
import CounterComponent from './component'

const mapStateToProps = (state, ownProps) => {
    return {value: state.counter}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch(increment(ownProps.value))
    }
})

const Counter = connect(
    mapStateToProps,
    mapDispatchToProps
)(CounterComponent)

export default Counter