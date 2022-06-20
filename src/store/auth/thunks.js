import { chekingCredentials } from "./";

export const checkingAuthentication = () => {
    return async(dispatch) => {
        dispatch(chekingCredentials());
    };
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(chekingCredentials());
    };
}