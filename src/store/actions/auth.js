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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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
        const key = `?key=AIzaSyCuUy3AlpnCw1sRC5k9-Yrl9AUGGSWoYs8`;
        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        if (!isSignup)
            basePath = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';

        dispatch(authStart());
        axios
            .post(basePath + key, authData)
            .then(resp => {
                const {idToken, localId, expiresIn} = resp.data;
                const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
                localStorage.setItem('token', idToken);
                localStorage.setItem('userId', localId);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(idToken, localId));
                dispatch(checkAuthTimeout(expiresIn));
            })
            .catch(errors => {
                const {error} = errors.response.data;
                dispatch(authFail(error));
            });
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
};