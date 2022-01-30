import {
    USER_SIGNUP,
    USER_SIGNIN,
    BALANCE_TRANSFER,
    BALANCE_WITHDRAW,
    VIEW_STATEMENT,
  } from "../actions/action-type";

const initialState = {};

function appReducer(state=initialState, action){
    const { type, payload } = action;
    switch(type){
        case USER_SIGNUP : return [...state,payload];
        case USER_SIGNIN : return [...state,payload];
        case BALANCE_TRANSFER : return [...state,payload];
        case BALANCE_WITHDRAW : return [...state,payload];
        case VIEW_STATEMENT : return [...state,payload];
        default : return state;
    }
}
export default appReducer;