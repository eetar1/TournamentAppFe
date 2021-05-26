import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Button, Dimmer, Form, Header, Loader, Modal, Icon } from 'semantic-ui-react'
import { api } from '../../../api/api'
import './Modal.css'

export function CreateTeamModal ({ open, handleCloseModal }) {
  const [teamName, setTeamName] = useState('')
  const [teamMembers, setTeamMembers] = useState([{ name: '', position: '' }])

  function handleClose () {
    setTeamMembers([{ name: '', position: '' }])
    setTeamName('')
    handleCloseModal()
  }

  function addTeamMember () {
    const newMember = { name: '', position: '' }
    setTeamMembers([...teamMembers, { ...newMember }])
  }

  async function createTeam () {
    try {
      const payload = { name: teamName, teamMembers }
      await api.createTeam(payload)
      toast.success('Team created')
      handleClose()
    } catch (e) {
      toast.error('Failed to create team')
      console.log('Failed to creat team ' + e)
    }
  }

  function setTeamMemberPosition (value, i) {
    teamMembers[i].position = value
  }

  function setTeamMemberName (value, i) {
    teamMembers[i].name = value
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
                <Header color="teal" as="h1" content="Create a Team"/>
            </Modal.Header>
            <Modal.Content className={'baseModal'}>
                <Modal.Description>
                    <Form>
                        <Form.Group>
                            <Form.Input
                                label=' Team Name'
                                fluid
                                placeholder='Team Name'
                                width={8}
                                onChange={(e, { value }) => setTeamName(value)}
                            />
                        </Form.Group>
                        {
                            teamMembers.map((val, idx) => {
                              return (
                                    <div key={idx}>
                                        <Form.Group widths='equal'>
                                            <Form.Input
                                                label='Team Member Position'
                                                fluid
                                                placeholder='Position'
                                                onChange={(e, { value }) => setTeamMemberPosition(value, idx)}
                                            />
                                            <Form.Input
                                                label='Team Member Name'
                                                fluid
                                                placeholder='Name'
                                                onChange={(e, { value }) => setTeamMemberName(value, idx)}
                                            />
                                        </Form.Group>
                                    </div>
                              )
                            })
                        }
                        <div className='centered'>
                            <button style={{ border: 'none', background: 'none' }} onClick={() => addTeamMember()}><Icon
                                style={{}} name='plus circle' color='teal'/></button>
                        </div>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions className={'baseModal'}>
                <Button negative floated="left" content="Cancel" color='red' onClick={() => handleClose()}/>
                <Button
                    content="Create Team"
                    positive
                    onClick={() => createTeam()}
                />
            </Modal.Actions>
        </Modal>
  )
}

CreateTeamModal.propTypes =
    {
      open: PropTypes.bool.isRequired,
      handleCloseModal:
        PropTypes.func.isRequired
    }
