export const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        localStorage.setItem("shapes", JSON.stringify(getState().shapes));
        return result;
    }
};