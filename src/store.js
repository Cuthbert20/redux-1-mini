import {createStore} from 'redux'
import { create } from 'domain';

const initialState = {
    currentValue: 0,
    futureValues: [],
    previousValues: []
}

//ACTION CONSTANTS
export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"
export const UNDO = 'UNDO'
export const REDO = 'REDO'

//REDUCER
function countReducer(state = initialState, action) {
    switch(action.type){
        case INCREMENT:
            return {...state, currentValue: state.currentValue + action.payload}
        case DECREMENT:
            return {...state, currentValue: state.currentValue - action.payload}
        case UNDO://should set futureValues to empty array
        //add to the prviousValues array by taking currentValue of the state object passed in and adding to the beginning of a new array.
        //then destructure the prviousValues array from that same state object and place the destructured array at the end of the new previousValues Array.
        return{
            currentValue: state.previousValues[0],
            futureValues: [state.currentValue, ...state.previousValues],
            previousValues: state.previousValues.slice(1)
        }
        case REDO:
            return {
                //the currentValue should be set to the first value in the passed in state's futureValues array
                currentValue: state.futureValues[0],
                //futureValues should be set to a copy of the futureValues array passed in on state minus the first index
                futureValues: state.futureValues.slice(1),
                //previousValues should add the current value of passed in state at the beginning of the array and copy over any existing value??
                previousValues: [state.currentValue, ...state.previousValues]
            }
            return 
        default:
            return state
    }
}

//EXPORT STORE
export default createStore(countReducer)