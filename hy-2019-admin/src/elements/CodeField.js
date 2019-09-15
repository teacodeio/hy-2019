import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import Typography from '@material-ui/core/Typography'

import { Labeled } from 'react-admin'

const CodeField = ({ className, children, label }) => {
  return (
    <Labeled
      label={label}
    >
      <Typography
        component='span'
        body1='body1'
        className={className}
      >
        {children}
      </Typography>
    </Labeled>
  )
}

CodeField.propTypes = {
  addLabel: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string
}

const PureCodeField = pure(CodeField)

PureCodeField.defaultProps = {
  addLabel: true
}

export default PureCodeField
