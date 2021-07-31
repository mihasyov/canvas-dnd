import {ADD_SHAPE_ON_CANVAS, DELETE_SHAPE, SET_ACTIVE_SHAPE} from "./types"
export const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        if(action.type === ADD_SHAPE_ON_CANVAS || action.type === DELETE_SHAPE || action.type === SET_ACTIVE_SHAPE) {
            const result = next(action);
            localStorage.setItem("shapes", JSON.stringify(getState().shapes));
            return result;
        }
        return next(action);
        
    }
};