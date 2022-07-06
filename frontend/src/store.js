import React, { createContext, useContext } from "react";
import useReducerWithSideEffects, { UpdateWithSideEffect } from 'use-reducer-with-side-effects';
import { getStorageItem, setStorageItem }  from "utils/useLocalStorage";


const AppContext = createContext();

const reducer = (prevState, action) => {
    const { type } = action;

//    if ( type === SET_TOKEN ) {
//        const { payload: jwtToken } = action;
//        const newState = { ...prevState, jwtToken, isAuthenticated: true };
//        return UpdateWithSideEffect(newState, (state, dispatch) => {
//            setStorageItem("jwtToken", jwtToken);
//        });
//
//    }
//    else if ( type === DELETE_TOKEN ) {
//        const newState = { ...prevState, jwtToken:"", isAuthenticated: false };
//        return UpdateWithSideEffect(newState, (state, dispatch) => {
//            setStorageItem("jwtToken", "");
//        });
//    }
//    return prevState;
//};
    if ( type === SET_TOKEN ) {
        const { payload: Token } = action;
        const newState = { ...prevState, Token, isAuthenticated: true };
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            setStorageItem("Token", Token);
        });

    }
    else if ( type === DELETE_TOKEN ) {
        const newState = { ...prevState, Token:"", isAuthenticated: false };
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            setStorageItem("Token", "");
        });
    }
    return prevState;
};

//export const AppProvider = ({ children }) => {
//    const jwtToken = getStorageItem("jwtToken", "");
//    const [store, dispatch] = useReducerWithSideEffects(reducer, {
//        jwtToken,
//        isAuthenticated: (jwtToken.length > 0)
//    });
//    return (
//        <AppContext.Provider value={{ store, dispatch }} >
//            { children }
//        </AppContext.Provider>
//    );
//};

export const AppProvider = ({ children }) => {
    const Token = getStorageItem("Token", "");
    const [store, dispatch] = useReducerWithSideEffects(reducer, {
        Token,
        isAuthenticated: (Token.length > 0)
    });
    return (
        <AppContext.Provider value={{ store, dispatch }} >
            { children }
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

// Actions
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

// Action Creators
export const setToken = token => ({ type: SET_TOKEN, payload: token });
export const deleteToken = () => ({ type: DELETE_TOKEN });