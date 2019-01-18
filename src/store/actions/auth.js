import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {type: actionTypes.AUTH_START}
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        let basePath = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser';
        const token = `?key=AIzaSyCuUy3AlpnCw1sRC5k9-Yrl9AUGGSWoYs8`;
        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        if (!isSignup)
            basePath = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';

        dispatch(authStart());
        axios
            .post(basePath + token, authData)
            .then(resp => {
                const {idToken, localId, expiresIn} = resp.data;
                dispatch(authSuccess(idToken, localId));
                dispatch(checkAuthTimeout(expiresIn));
            })
            .catch(errors => {
                const {error} = errors.response.data;
                dispatch(authFail(error));
            });
    }
};