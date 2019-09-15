import React from 'react'
import FileStackImage from './FileStackImage'

const FileStackImageField = ({ record, source, style }) => {
  if (!record) return null // TODO handle placeholder
  return (
    <FileStackImage
      handle={record[source]}
      style={{
        width: 80,
        height: 80,
        borderRadius: 60,
        marginTop: 10,
        marginBottom: 10,
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
        ...style
      }}
    />
  )
}

export default FileStackImageField
