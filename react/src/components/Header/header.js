import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { isEmpty, get } from 'lodash'

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOff: () => dispatch({ type: 'LOGOFF', payload: null })
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const HeaderToolbar = (props) => {
  const classes = useStyles()
  const user = props.user
  const logged = !isEmpty(user)
  return <div className={classes.root}>
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
          <MenuIcon />
        </IconButton>
        {logged && <Typography variant='h6' className={classes.title}>
            Bienvenido {get(user, 'user_data.username', '')}
        </Typography>}
        {logged && <Button onClick={() => props.logOff()} color='inherit'>LogOff</Button>}
        {!logged && <Button color='inherit'>LogIn</Button>}
      </Toolbar>
    </AppBar>
  </div>
}

class Header extends React.Component {
  render () {
    return (
      <HeaderToolbar {...this.props} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
