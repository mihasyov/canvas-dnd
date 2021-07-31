import {
    ADD_SHAPE_ON_CANVAS,
    SET_TARGET_EL,
    SET_MOUSE_DOWN,
    SET_MOUSE_UP,
    SWAP_SHAPES,
    MOUSE_OUT,
    DELETE_SHAPE
} from "./types";

export const rootReducer = (state, action) => {
    switch (action.type) {
        case SET_MOUSE_DOWN:
            return {
                ...state,
                isMouseDown: true
            };
        case SET_MOUSE_UP:
            return {
                ...state,
                isMouseDown: false,
                isOnTarget: false,
                targetEl: null
            };
        case ADD_SHAPE_ON_CANVAS:
            return {
                ...state,
                shapes : [
                    ...state.shapes, action.payload
                ]
                
            };
        case SET_TARGET_EL:
            return {
                ...state,
                ...action.payload,
            };
        
        
        default:
            return state;
    }
}