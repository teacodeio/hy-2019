import React from 'react'
import PropTypes from 'prop-types'
import {
  Labeled,
  showNotification,
  FieldTitle,
  fetchStart,
  fetchEnd,
  REDUX_FORM_NAME
} from 'react-admin'
import { change } from 'redux-form'
import { connect } from 'react-redux'
import MuiButton from '@material-ui/core/Button'
import AddAPhoto from '@material-ui/icons/AddAPhoto'
import * as fileStack from 'filestack-js'
import { addField } from 'ra-core'

const defaultFileStackOptions = {
  'maxFiles': 1,
  'accept': [
    'image/*'
  ],
  transformations: {
    crop: {
      aspectRatio: 1,
      force: true
    },
    rotate: true
  },
  // cleanupImageExif: true,
  'uploadInBackground': false,
  imageDim: [600, 600]
}

const _FileStackImageInput = props => {
  const _onFileUploadFinished = async file => {
    try {
      props.fetchStart()
      props.change(REDUX_FORM_NAME, props.source, file.handle)
    } catch (err) {
      props.showNotification(err.message, 'error')
    } finally {
      props.fetchEnd()
    }
  }
  const _onFileUploadFailed = (file, err) => props.showNotification(err.message, 'warning')
  const _handleClick = () => {
    fileStack
      .init(process.env.REACT_APP_FILESTACK_API_KEY)
      .picker({
        ...defaultFileStackOptions,
        onFileUploadFinished: _onFileUploadFinished,
        onFileUploadFailed: _onFileUploadFailed,
        ...props.pickerOptions
      })
      .open()
  }

  return (
    <Labeled
      source={props.source}
      resource={props.resource}
    >
      <MuiButton
        onClick={_handleClick}
        color='primary'
      >
        <AddAPhoto />&nbsp;&nbsp;
        <FieldTitle
          label={props.label}
          source={props.source}
          resource={props.resource}
          isRequired={props.isRequired}
        />
      </MuiButton>
    </Labeled>
  )
}

const FileStackImageInput = addField(_FileStackImageInput)

FileStackImageInput.propTypes = {
  showNotification: PropTypes.func,
  fetchStart: PropTypes.func,
  fetchEnd: PropTypes.func,
  change: PropTypes.func,
  pickerOptions: PropTypes.object
}

FileStackImageInput.defaultProps = {
  pickerOptions: {}
}

export default connect(null, {
  showNotification,
  fetchStart,
  fetchEnd,
  change
})(FileStackImageInput)
