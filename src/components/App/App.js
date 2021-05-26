import './App.css'
import { ToastContainer } from 'react-toastify'
import { Jwt } from './../../api/jwt'
import { Login } from '../Login/Login'
import { NavBar } from '../NavBar/NavBar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Tournament } from '../Tournaments/Tournament'
import { Dashboard } from '../Dashboard/Dashboard'
import { Matchs } from '../Matches/Matchs'
import { Match } from '../Matches/SingleMatch'
import { MyPage } from '../MyPage/MyPage'
import React from 'react'

export function App () {
  const { token, setToken } = Jwt()

  return (
        <div style={{ backgroundColor: '#333', height: '100%' }}>

            <BrowserRouter>
                {!token
                  ? <Login setToken={setToken}/>
                  : <div>
                        <NavBar setToken={setToken}/>
                        <Switch>
                            <Route exact path={['/dashboard', '/']}>
                                <Dashboard setToken={setToken}/>
                            </Route>
                            <Route exact path={'/me'}>
                                <MyPage/>
                            </Route>
                            <Route path="/match/:id">
                                <Match/>
                            </Route>
                            <Route path="/matches">
                                <Matchs/>
                            </Route>
                            <Route path="/tournaments">
                                <Tournament/>
                            </Route>
                        </Switch>
                    </div>
                }
            </BrowserRouter>
            <ToastContainer/>
        </div>
  )
}

export default App
