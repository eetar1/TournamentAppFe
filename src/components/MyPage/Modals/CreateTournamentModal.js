import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Dimmer, Form, Grid, Header, Icon, Loader, Modal } from 'semantic-ui-react'

export function CreateTournamentModal ({ open, handleCloseModal }) {
  const [tournamentName, setTournamentName] = useState('')
  const [gameName, setGameName] = useState('')
  const [teams, setTeams] = useState(['', '', ''])

  function handleClose () {
    handleCloseModal()
  }

  function setTeamName (name, idx) {
    teams[idx] = name
  }

  function addTeam () {
    setTeams([...teams, { ...'' }])
  }

  function createTournament () {
    // eslint-disable-next-line no-unused-vars
    const payload = { name: tournamentName, gameName, teams }
    return undefined
  }

  function removeTeam () {
    if (teams.length > 3) {
      teams.pop()
    }
  }

  return (
        <Modal
            onClose={() => handleClose()}
            open={open}
            dimmer="blurring"
            size="tiny">
            <Dimmer active={false}>
                <Loader>{'Processing Deposit...'}</Loader>
            </Dimmer>
            <Modal.Header className={'baseModal'}>
                <Header color="teal" as="h1" content="Create a Tournament"/>
            </Modal.Header>
            <Modal.Content scrolling className={'baseModal'}>
                <Modal.Description>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label='Tournament Name'
                                fluid
                                placeholder='Tournament Name'
                                onChange={(e, { value }) => setTournamentName(value)}
                            />
                            <Form.Input
                                label='Game Name'
                                fluid
                                placeholder='Game Name'
                                onChange={(e, { value }) => setGameName(value)}
                            />

                        </Form.Group>

                        <Header color='teal' style={{ paddingTop: '.5em' }} >Teams</Header>
                        <p style={{ color: 'white', margin: '0', paddingBottom: '1em' }} > Order of teams does not matter they will be seeded randomly</p>
                        <Grid divided columns={2} style={{ padding: '0 .5em 0 .5em' }} >
                            {
                                teams.map((val, idx) => {
                                  return (
                                      <Grid.Column key ={idx} style={{ padding: '.5em .5em 0 .5em' }}>
                                        <div key={idx} >
                                            <Form.Input
                                                label={'Team ' + (idx + 1)}
                                                fluid
                                                placeholder='Name'
                                                onChange={(e, { value }) => setTeamName(value, idx)}
                                            />
                                        </div>
                                      </Grid.Column>
                                  )
                                })
                            }
                        </Grid>
                        <div className='centered' style={{ padding: '2em 0 0 0' }}>
                            <button style={{ border: 'none', background: 'none' }} onClick={() => addTeam()}><Icon
                                style={{}} name='plus circle' color='teal'/></button>
                           <button style={{ border: 'none', background: 'none', opacity: teams.length > 3 ? 1 : 0 }} onClick={() => removeTeam()}><Icon
                                style={{}} name='minus circle' color='teal'/></button>
                        </div>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions className={'baseModal'}>
                <Button negative floated="left" content="Cancel" color='red' onClick={() => handleClose()}/>
                <Button
                    content="Create Match"
                    positive
                    onClick={() => createTournament()}
                />
            </Modal.Actions>
        </Modal>
  )
}

CreateTournamentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired
}
