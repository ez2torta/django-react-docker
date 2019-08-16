import React from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { isEmpty, filter } from 'lodash'
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    userList: state.ticket.users,
    tickets: state.ticket.tickets,
    loadingUsers: state.ticket.isLoadingUsers,
    loadingTickets: state.ticket.isLoadingTickets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listUsers: (payload) => dispatch({ type: 'LIST_USERS_REQUEST', payload: payload }),
    listTicket: (payload) => dispatch({ type: 'LIST_TICKET_REQUEST', payload: payload }),
    editTicket: (payload) => dispatch({ type: 'EDIT_TICKET_REQUEST', payload: payload }),
    deleteTicket: (payload) => dispatch({ type: 'DELETE_TICKET_REQUEST', payload: payload }),
    createTicket: (payload) => dispatch({ type: 'CREATE_TICKET_REQUEST', payload: payload }),
    assignTicket: (payload) => dispatch({ type: 'ASSIGN_TICKET_REQUEST', payload: payload })
  }
}

class TicketList extends React.Component {
  userName (user) {
    return !isEmpty(user) ? user.first_name + user.last_name : ''
  }

  columnParser () {
    const userList = this.props.userList

    return [
      { title: 'Ticket',
        field: 'id',
        type: 'numeric',
        readonly: true,
        editable: 'never' },
      {
        title: 'Usuario',
        field: 'user',
        // editable: 'onAdd',
        render: rowData => <span>{this.userName(rowData.user)}</span>, // ver lookup?
        editComponent: props => (
          <Select value={props.value ? props.value : {}}
            renderValue={user => this.userName(user)}
            onChange={e => props.onChange(e.target.value)}>
            {userList.map(user =>
              <MenuItem value={user}
                key={user.id}>
                {this.userName(user)}
              </MenuItem>)
            }
          </Select>
        )
      },

      { title: 'Estado',
        field: 'pedido',
        render: rowData => <span>{rowData.pedido === 1 ? 'Pedido' : 'Libre'}</span>,
        editComponent: props => (
          <Select value={props.value ? props.value : {}}
            renderValue={pedido => pedido === 1 ? 'Pedido' : 'Libre'}
            onChange={e => props.onChange(e.target.value)}>
            <MenuItem value={1}>
                Pedido
            </MenuItem>
            <MenuItem value={0}>
                Libre
            </MenuItem>
          </Select>
        )
      }
    ]
  }

  componentDidMount () {
    const token = this.props.user && this.props.user.token ? this.props.user.token : null
    const data = { token: token }
    if (token) {
      this.props.listUsers(data)
      this.props.listTicket(data)
    }
  }

  actions () {
    // si no es admin
    if (!this.isAdmin()) {
      const token = this.props.user.token
      return [
        rowData => ({
          icon: 'check',
          tooltip: 'Pedir Ticket',
          disabled: rowData.pedido === 1,
          onClick: (event, rowData) => {
            // alert('You saved ' + rowData) // TODO
            console.log(rowData)
            const data = {
              user_id: rowData.user.id,
              id: rowData.id,
              pedido: rowData.pedido === 1 ? 0 : 1
            }
            this.props.editTicket({ token: token, ticketData: data })
          }
        }
        )
      ]
    } else {
      return []
    }
  }

  editable () {
    const token = this.props.user.token
    const isAdmin = this.isAdmin()
    if (isAdmin) {
      return {
        onRowAdd: newData =>
          new Promise(resolve => {
            const data = newData
            data.user_id = newData.user.id
            setTimeout(() => {
              resolve()
              this.props.createTicket({ token: token, ticketData: data })
            }, 600)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            const data = newData
            data.user_id = newData.user.id
            setTimeout(() => {
              resolve()
              this.props.editTicket({ token: token, ticketData: data })
            }, 600)
          }),
        onRowDelete: oldData => {
          // console.log(oldData)
          return new Promise(resolve => {
            setTimeout(() => {
              resolve()
              const ticketId = oldData.id
              this.props.deleteTicket({ token: token, ticketId: ticketId })
            }, 600)
          })
        }
      }
    } else {
      return {}
    }
  }

  isAdmin () {
    const user = this.props.user
    if (!isEmpty(user)) {
      const groups = user.user_data.groups
      return !isEmpty(filter(groups, (item) => item.name === 'Admins'))
    } else {
      return false
    }
  }

  render () {
    const user = this.props.user
    const loading = this.props.loading
    if (isEmpty(user)) {
      return <Redirect to='/' />
    }
    if (loading) {
      return <CircularProgress />
    }
    const columns = this.columnParser()

    const data = this.props.tickets
    return (
      <Container component='main' >
        <CssBaseline />
        <MaterialTable
          title='Tickets'
          columns={columns}
          data={data}
          options={{ pageSize: 10 }}
          actions={this.actions.bind(this)()}
          editable={this.editable.bind(this)()}
        />
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketList)
