import { Modal, Header, Form, Button } from 'semantic-ui-react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { api } from '../../../api/api'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import './Modal.css'
import 'react-datepicker/dist/react-datepicker.css'

export function CreateMatchModal ({ open, handleCloseModal }) {
  const [matchDate, setMatchDate] = useState(null)
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [official, setOfficial] = useState('')
  const [gameName, setGameName] = useState('')

  async function createMatch () {
    const payload = { matchDate: matchDate?.toISOString(), homeTeam, awayTeam, gameName, official }
    try {
      await api.createMatch(payload)
      toast.success('Matchs Created')
      handleCloseModal()
    } catch (e) {
      toast.error('Failed to create match.')
      console.log('Error processing: ' + e)
    }
  }

  function handleClose () {
    setMatchDate(null)
    setHomeTeam('')
    setAwayTeam('')
    setOfficial('')
    setGameName('')
    handleCloseModal()
  }

  return (
        <Modal
            onClose={() => handleClose()}
            open={open}
            dimmer="blurring"
            size="tiny"
            detachable="false">
            <Modal.Header className={'baseModal'}>
                <Header color="teal" as="h1" content="Create a Match"/>
            </Modal.Header>
            <Modal.Content className={'baseModal'}>
                <Modal.Description>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label='Home Team Name'
                                fluid
                                placeholder='Home Team'
                                onChange={(e, { value }) => setHomeTeam(value)}
                            />
                            <Form.Input
                                label='Away Team Name'
                                fluid
                                placeholder='Away Team'
                                onChange={(e, { value }) => setAwayTeam(value)}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label='Game Name'
                                placeholder='Game Name'
                                fluid
                                onChange={(e, { value }) => setGameName(value)}
                            />
                            <div className='field'>
                                <label>Match Date</label>
                                <DatePicker placeholderText='Optional' dateFormat='Pp' selected={matchDate}
                                            showTimeSelect onChange={(value) => setMatchDate(value)}/>
                            </div>
                            {/* <SemanticDatepicker datePickerOnly label='Matchs Date' format='YYYY-MM-DD-HH' locale='en-US' onChange={(e, { value }) => setMatchDate(value.toISOString())}/>; */}
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label='Official Name'
                                placeholder='Official'
                                fluid
                                onChange={(e, { value }) => setOfficial(value)}
                            />
                            <Form.Input value={matchDate ? 'Scheduled' : 'Created'} fluid
                                        label='Matchs will be created with Status' placeholder='Read only'
                                        readOnly/>
                        </Form.Group>

                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions className={'baseModal'}>
                <Button negative floated="left" content="Cancel" color='red' onClick={() => handleClose()}/>
                <Button
                    content="Create Matchs"
                    positive
                    onClick={() => createMatch()}
                />
            </Modal.Actions>

        </Modal>

  )
}

CreateMatchModal.propTypes =
    {
      open: PropTypes.bool.isRequired,
      handleCloseModal:
        PropTypes.func.isRequired
    }
