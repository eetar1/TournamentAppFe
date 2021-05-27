import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api/api'
import { Button, Form, Grid, Header, Modal } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

export function SetMatchDateModal ({ open, onClose, matchId }) {
  const [date, setDate] = useState(null)

  function handleClose () {
    setDate(null)
    onClose()
  }

  async function scheduleMatch () {
    try {
      await api.scheduleMatch(date.toISOString(), matchId)
      toast.success('MatchScheduled')
      handleClose()
    } catch (e) {
      toast.error('Failed to schedule match')
      console.log('Failed to schedule Match ' + e)
    }
  }

  return (
        <Modal
            onClose={() => handleClose()}
            open={open}
            dimmer="blurring"
            size="mini"
            detachable="false">
            <Modal.Header className={'baseModal'}>
                <Header color="teal" as="h1" content="Schedule Match"/>
            </Modal.Header>
            <Modal.Content className={'baseModal'}>
                <Modal.Description>
                    <Form>
                        <Grid centered colums={3}>
                            <div className='field'>
                                <label>Match Date</label>
                                <DatePicker style={{ width: '60%' }} placeholderText='MM/DD/YYYY, HH:MM' dateFormat='Pp'
                                            selected={date}
                                            showTimeSelect onChange={(value) => setDate(value)}/>
                            </div>
                        </Grid>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions className={'baseModal'}>
                <Button negative floated="left" content="Cancel" color='red' onClick={() => handleClose()}/>
                <Button
                    content="Schedule Match"
                    positive
                    onClick={() => scheduleMatch()}
                />
            </Modal.Actions>
        </Modal>
  )
}

SetMatchDateModal.propTypes =
    {
      open: PropTypes.bool.isRequired,
      onClose:
        PropTypes.func.isRequired,
      matchId:
        PropTypes.string.isRequired
    }
