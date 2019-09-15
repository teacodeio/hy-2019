import React from 'react'
import { get, set } from 'lodash'

import {
  CloneButton
} from 'react-admin'

const DuplicateButton = ({ record, source = 'name', ...rest }) => {
  const copyName = source && get(record, source) ? `${get(record, source)} - copy` : undefined
  let newRecord = { ...record }
  if (copyName) {
    newRecord = set(newRecord, source, copyName)
  }

  return (
    <CloneButton
      label={'Duplicate'}
      {...rest}
      record={newRecord}
    />
  )
}

export default DuplicateButton
