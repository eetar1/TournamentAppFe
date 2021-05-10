import TourneyApi from './tourneyApi'

let beURL = 'http://localhost:8080/tourney';
let api;

const getToken = () => {
    const tokenString = sessionStorage.getItem('access_token');
    const userToken = JSON.parse(tokenString);
    return userToken?.access_token
};

api = new TourneyApi(`${beURL}`, getToken());

export { api }
