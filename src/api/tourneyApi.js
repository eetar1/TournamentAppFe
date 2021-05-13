export default class TourneyApi {
  constructor (host, token) {
    this.apiHost = host
    this.jwt = token
  }

    updateToken = () => {
      const tokenString = sessionStorage.getItem('tourney_access_token')
      const userToken = JSON.parse(tokenString)
      this.jwt = userToken ? userToken?.access_token : null
    }

    headers = (headers) => {
      return this.jwt
        ? {
            ...headers,
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `${this.jwt}`
          }
        : headers
    }

    userSignup = async (credentials) => {
      const url = `${this.apiHost}/users/sign-up`
      const response = await fetch(url, {
        method: 'POST',
        headers: this.headers({ 'Content-Type': 'application/json; charset=utf-8' }),
        body: JSON.stringify(credentials)
      })
      return handleErrors(response)
    }

    userLogin = async (credentials) => {
      const url = `${this.apiHost}/users/login`
      const response = await fetch(url, {
        method: 'POST',
        headers: this.headers({}),
        body: JSON.stringify(credentials)
      })
      return handleErrors(response)
    }

    getTopTournaments = async (pageSize = 0) => {
      const url = `${this.apiHost}/tournaments/all?size=${pageSize}`
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers({ 'Content-Type': 'application/json; charset=utf-8' })
      })
      return handleErrors(response)
    }

    getTopTeams = async (pageSize = 20) => {
      const url = `${this.apiHost}/teams/top?size=${pageSize}`
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers({ 'Content-Type': 'application/json; charset=utf-8' })
      })
      return handleErrors(response)
    }
}

function handleErrors (response) {
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json()
}
