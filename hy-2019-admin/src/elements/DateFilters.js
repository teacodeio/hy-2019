import React from 'react'
import {
  DateInput
} from 'react-admin'

export default [
  <DateInput source='createdAfter' key='createdAfter' />,
  <DateInput source='createdBefore' key='createdBefore' />,
  <DateInput source='updatedAfter' key='updatedAfter' />,
  <DateInput source='updatedBefore' key='updatedBefore' />
]
