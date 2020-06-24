import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'

import './dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      email: 'miltondyama@gmail.com'
    }
    this.logOut = this.logOut.bind(this)
  }

  async componentDidMount() {
    if(!firebase.getCurrent()) {
      this.props.history.replace('/login')
      return null
    }
    firebase.getUserName(info => this.setState({ nome: info.val().nome }))
  }

  logOut = async () => {
    await firebase.logOut()
    .catch(err => console.log(err))
    this.props.history.push('/')
  }

  render() {
    return (
      <div id='dashboard'>
        <div className='user-info'>
          <h1>Bem-vindo, {this.state.nome}</h1>
          <Link to='/dashboard/new'>Novo Post</Link>
        </div>
        <p>Logado com: {firebase.getCurrent()}</p>
        <button onClick={() => this.logOut}>Deslogar</button>
      </div>
    )
  }
}

export default withRouter(Dashboard)