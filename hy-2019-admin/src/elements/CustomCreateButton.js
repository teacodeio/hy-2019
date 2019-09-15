import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-admin'
import MuiButton from '@material-ui/core/Button'
import { stringify } from 'query-string'

const styles = {
  button: {
    marginTop: '1em'
  }
}

const CustomCreateButton = withStyles(styles)(({ classes, record, getSearch, targetResource, children }) => (
  <MuiButton
    className={classes.button}
    color='primary'
    component={Link}
    to={{
      pathname: `/${targetResource}/create`,
      search: stringify(getSearch(record))
    }}
  >
    {children}
  </MuiButton>
))

export default CustomCreateButton
