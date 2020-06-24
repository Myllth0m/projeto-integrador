import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'

import './login.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.entrar = this.entrar.bind(this)
    this.login = this.login.bind(this)
  }

  componentDidMount() {
    if(firebase.getCurrent()) {
      return this.props.history.replace('/dashboard')
    }
  }
  entrar = e => {
    this.login()
    e.preventDefault()
  }

  login = async () => {
    try {
      const { email, password } = this.state
      await firebase.login(email, password)
      .catch(err => {
        if(err.code === 'auth/user-not-found') {alert('Este usuário não existe')}
        else(alert(`[ERROR: ${err.code}]`))
      })
      this.props.history.replace('/dashboard')
    } catch(err) {
      alert(`[ERROR: ${err.message}]`)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.entrar} id='login'>
          <label>Email:</label>
          <input 
            autoFocus
            type='email'
            autoComplete='off'
            value={this.state.email}
            placeholder='teste@exemplo.com'
            onChange={e => this.setState({ email: e.target.value })}
          />
          <label>Senha:</label>
          <input
            type='password'
            autoComplete='off'
            placeholder='********'
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type='submit'>Entrar</button>
          <Link to='/register'>Ainda não tenho conta</Link>
        </form>
      </div>
    )
  }
}

export default withRouter(Login)