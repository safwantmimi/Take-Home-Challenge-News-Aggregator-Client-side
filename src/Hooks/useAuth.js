import React, {useContext, useEffect} from "react";
import {Cookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

import AuthContext from "../Contexts/AuthContext";
import apiClient from "../Services/api";
export const useAuth = () => {
    let navigate = useNavigate();

    const [userData, setUserData] = React.useState({signedIn: false, user: {}});

    const {setAuthData} = useContext(AuthContext);

    useEffect(() => {
        setAuthData(userData);
    }, [userData.signedIn]);

    function getAuthCookieExpiration()
    {
        let date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));  // 7 days
        return date;
    }

    function setAsLogged(user) {

        const cookie = new Cookies();

        cookie.set('is_auth', true, {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});

        setUserData({signedIn: true, user:user});

        navigate('/');
    }

    function setLogout() {
        const cookie = new Cookies();

        cookie.remove('is_auth', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});

        setUserData({signedIn: false, user: null});

        // navigate('/');
        window.location.reload();
    }

    function loginUserOnStartup()
    {
        const cookie = new Cookies();
        if(cookie.get('is_auth')) {
            apiClient.get('/api/user').then(response => {
                setUserData({signedIn: true, user: response.data.data});
                navigate('/');
            }).catch(error => {
                setUserData({signedIn: false, user: null});
                setLogout();
            });

        } else {
            setUserData({signedIn: false, user: null});
        }
    }

    function redirectToLogin() {
        navigate('/signIn');
    }

    return {
        userData,
        setAsLogged,
        setLogout,
        loginUserOnStartup,
        redirectToLogin
    }

};