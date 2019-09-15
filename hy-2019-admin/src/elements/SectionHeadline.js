import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  headline: {
    margin: '1.5em 0 1em',
    fontWeight: 500
  }
}

const SectionHeadline = withStyles(styles)(({ classes, variant, children }) => {
  return (
    <Typography
      className={classes.headline}
      variant={variant}
    >
      {children}
    </Typography>
  )
})

export default SectionHeadline
