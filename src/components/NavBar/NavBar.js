import React, { useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

export function NavBar ({ setToken }) {
  const [activePath, setActivePath] = useState(window.location.pathname)
  const history = useHistory()

  function handleItemClick (path) {
    history.push(path)
    setActivePath(path)
  }

  function handleLogout () {
    history.push('/')
    setToken('')
    sessionStorage.removeItem('tourney_access_token')
  }

  return (
        <Segment inverted>
            <Menu inverted secondary size='large'>
                <Menu.Item
                    name='dashboard'
                    active={activePath === '/dashboard' || activePath === '/'}
                    onClick={() => handleItemClick('/dashboard')}
                />
                <Menu.Item
                    name='Tournaments'
                    active={activePath === '/tournaments'}
                    onClick={() => handleItemClick('/tournaments')}
                />
                <Menu.Item
                    name='Teams'
                    active={activePath === '/teams'}
                    onClick={() => handleItemClick('/teams')}
                />
                <Menu.Item
                    name='Matchs'
                    active={activePath === '/matches'}
                    onClick={() => handleItemClick('/matches')}
                />
                <Menu.Item
                    name='MyPage'
                    active={activePath === '/me'}
                    onClick={() => handleItemClick('/me')}
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='logout'
                        onClick={() => handleLogout()}
                    />
                </Menu.Menu>
            </Menu>
        </Segment>
  )
}
NavBar.propTypes = {
  setToken: PropTypes.func.isRequired
}
