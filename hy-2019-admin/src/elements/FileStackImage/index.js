import React from 'react'
import classNames from 'classnames'

import 'lazysizes'
import 'lazysizes/plugins/rias/ls.rias'

import './index.css'

const FileStackImage = props => (
  <img
    {...props}
    className={classNames('lazyload', 'blur-up', props.className)}
    src={`https://cdn.filestackcontent.com/resize=width:10/${props.handle}`}
    data-src={`https://cdn.filestackcontent.com/resize=width:{width}/${props.handle}`}
    data-sizes='auto'
  />
)

export default FileStackImage
