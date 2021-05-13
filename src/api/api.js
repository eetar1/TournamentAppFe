import TourneyApi from './tourneyApi'

const beURL = 'http://localhost:8080/tourney'

const getToken = () => {
  const tokenString = sessionStorage.getItem('tourney_access_token')
  const userToken = JSON.parse(tokenString)
  return userToken?.access_token
}

const api = new TourneyApi(`${beURL}`, getToken())

export { api }
