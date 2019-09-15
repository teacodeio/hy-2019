import React from 'react'
import { CardActions } from 'react-admin'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import shortid from 'shortid'

const styles = {
  container: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem'
  },
  text: {
    color: '#3f51b5',
    fontSize: '.75rem',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginLeft: '.5rem',
    fontWeight: 500
  }
}

function returnNewElement (initials) {
  let newElement = {
    _id: shortid.generate()
  }
  if (initials) {
    initials.forEach(element => {
      newElement[element] = ''
    })
  }
  return newElement
}

const SectionActions = withStyles(styles)((props) => {
  return (
    <CardActions className={props.classes.container}>
      <Typography
        className={props.classes.text}
        onClick={() => {
          let elemTmp = props.array[props.index - 1]
          props.array[props.index - 1] = props.array[props.index]
          props.array[props.index] = elemTmp
          props.updateElement()
        }}
        style={{
          display: props.index > 0 ? 'initial' : 'none'
        }}
      >
        Move Up
      </Typography>
      <Typography
        className={props.classes.text}
        onClick={() => {
          let elemTmp = props.array[props.index + 1]
          props.array[props.index + 1] = props.array[props.index]
          props.array[props.index] = elemTmp
          props.updateElement()
        }}
        style={{
          display: props.index < props.array.length - 1 ? 'initial' : 'none'
        }}
      >
        Move Down
      </Typography>
      <Typography
        className={props.classes.text}
        onClick={() => {
          props.array.splice(props.index, 0, returnNewElement(props.initials))
          props.updateElement()
        }}
      >
        Add above
      </Typography>
      <Typography
        className={props.classes.text}
        onClick={() => {
          props.array.splice(props.index + 1, 0, returnNewElement(props.initials))
          props.updateElement()
        }}
      >
        Add below
      </Typography>
      <Typography
        className={props.classes.text}
        onClick={() => {
          props.array.splice(props.index, 1)
          props.updateElement()
        }}
      >
        Delete
      </Typography>
    </CardActions>
  )
})

export default SectionActions
