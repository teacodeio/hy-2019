import React from 'react'
import {
  Button
} from 'react-admin'

const ConnectSlack = (props) => (
  <a
    href={`${process.env.REACT_APP_API_URL}/auth-slack/${window.localStorage.getItem(process.env.REACT_APP_JWT_KEY)}?userId=${props.record.id}`}
    style={{
      textDecoration: 'none'
    }}
  >
    <Button
      label='Connect Slack'
      style={{
        padding: '8px 16px',
        marginTop: 20
      }}
    >
      <img
        alt='Add to Slack'
        height='20'
        width='20'
        src={process.env.PUBLIC_URL + 'slack-icon-256.png'}
      />
    </Button>
  </a>
)

export default ConnectSlack
