import { useState } from 'react';
import {api} from "./api"

export function Jwt() {

    const getToken = () => {
        const tokenString = sessionStorage.getItem('tourney_access_token');
        const userToken = JSON.parse(tokenString);
        return userToken?.access_token
    }

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('tourney_access_token', JSON.stringify(userToken));
        setToken(userToken.access_token);
        api.updateToken();
    };

    return {
        setToken: saveToken,
        token
    }
}
