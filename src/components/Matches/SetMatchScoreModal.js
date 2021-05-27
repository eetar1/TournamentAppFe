import React, { useState } from 'react'
import { api } from '../../api/api'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { Button, Dropdown, Form, Header, Modal } from 'semantic-ui-react'

export function SetMatchScoreModal ({ open, onClose, matchId }) {
  const [score, setScore] = useState(null)
  const [result, setResult] = useState(null)

  const options = [{ key: 'hv', text: 'Home_Victory', value: 'Home_Victory' }, {
    key: 'av',
    text: 'Away Victory',
    value: 'Away Victory'
  }, { key: 'dd', text: 'Draw', value: 'Draw' }]

  async function scoreMatch () {
    try {
      const payload = { score, result: result.value, id: matchId }
      await api.completeMatch(payload)
      toast.success('MatchScheduled')
      onClose()
    } catch (e) {
      toast.error('Failed to score match')
      console.log('Failed to score Match ' + e)
    }
  }

  function handleClose () {
    setResult('')
    setScore('')
    onClose()
  }

  return (<Modal
            onClose={() => handleClose()}
            open={open}
            dimmer="blurring"
            size="tiny"
            detachable="false">
            <Modal.Header className={'baseModal'}>
                <Header color="teal" as="h1" content="Score Match"/>
            </Modal.Header>
            <Modal.Content className={'baseModal'}>
                <Modal.Description>
                    <Form>
                        <Form.Group>
                            <div className='field' style={{ width: '50%' }}>
                                <label>Match Date</label>
                                <Dropdown placeholder='Result' fluid selection
                                          options={options} onChange = {(e, value) => setResult(value)} />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input
                                label='Score'
                                placeholder='Score'
                                fluid
                                width={8}
                                onChange={(e, { value }) => setScore(value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions className={'baseModal'}>
                <Button negative floated="left" content="Cancel" color='red' onClick={() => handleClose()}/>
                <Button
                    content="Score Match"
                    positive
                    onClick={() => scoreMatch()}
                />
            </Modal.Actions>
        </Modal>
  )
}

SetMatchScoreModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  matchId: PropTypes.string.isRequired
}
