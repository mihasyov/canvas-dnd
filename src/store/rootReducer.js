import {
    SET_TARGET_EL
} from "./types";

export const rootReducer = (state, action) => {
    switch (action.type) {
        case SET_TARGET_EL:
            return {
                ...state,
                
            };
        
        default:
            return state;
    }
}