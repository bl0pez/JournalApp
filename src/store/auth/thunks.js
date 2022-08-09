import { loginWithEmailPassword, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { chekingCredentials, login, logout } from "./";

export const checkingAuthentication = () => {
    return async(dispatch) => {
        dispatch(chekingCredentials());
    };
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(chekingCredentials());

        const result = singInWithGoogle();

    };
}

export const startCreateUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch(chekingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({email, password, displayName});

        if(!ok){
            return dispatch(logout({errorMessage}));
        }

        dispatch(login({uid, email, photoURL, displayName}));

    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(chekingCredentials());

        const { ok, uid, photoURL, errorMessage, displayName } = await loginWithEmailPassword({email, password});

        if(!ok){
            return dispatch(logout({errorMessage}));
        }

        dispatch(login({uid, email, photoURL, displayName}));

    }
}