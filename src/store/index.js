import {createStore, applyMiddleware} from "redux";
import {rootReducer} from './rootReducer';
import {localStorageMiddleware} from './middleware';

const getInitialState = () => {
    const shapes = JSON.parse(localStorage.getItem("shapes")) || [];
    return {
        targetEl: null,
        isTarget: false,
        isKeyDown: false,
        shapes

    }
}

const configureStore = () => {
    return createStore(rootReducer, getInitialState(), applyMiddleware(localStorageMiddleware));
}

export default configureStore();