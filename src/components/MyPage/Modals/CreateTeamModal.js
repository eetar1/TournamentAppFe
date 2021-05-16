import React from 'react'
import PropTypes from 'prop-types'

export function CreateTeamModal ({ open, handleCloseModal }) {
  return (
        <div></div>
  )
}

CreateTeamModal.propTypes =
    {
      open: PropTypes.bool.isRequired,
      handleCloseModal:
        PropTypes.func.isRequired
    }
