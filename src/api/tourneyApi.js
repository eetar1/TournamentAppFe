export default class TourneyApi {
    apiHost = ""
    jwt

    constructor(host, token) {
        this.apiHost = host;
        this.jwt = token
    }

    updateToken = () => {
        const tokenString = sessionStorage.getItem('access_token');
        const userToken = JSON.parse(tokenString);
        this.jwt = userToken.access_token;
    }

    headers = (headers) => {
        return this.jwt ? {
            ...headers,
            "Content-Type": "application/json; charset=utf-8",
            authorization: `${this.jwt}`,
        } : headers;
    }

    userSignup = async (credentials) => {
        const url = `${this.baseUrl}/users/sign-up`;
        const response = await fetch(url, {
            method: 'POST',
            headers: this.headers({"Content-Type": "application/json; charset=utf-8"}),
            body: JSON.stringify(credentials)
        });
        return handleErrors(response);
    }


}

function handleErrors(response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

