import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'

import './register.css'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      email: '',
      password: ''
    }
    this.register = this.register.bind(this)
    this.onRegister = this.onRegister.bind(this)
  }

  register = e => {
    this.onRegister()
    e.preventDefault()
  }

  onRegister = async () => {
    try {
      const { nome, email, password } = this.state
      await firebase.register(nome, email, password)
      this.props.history.replace('/dashboard')
    } catch(err) {
      alert(err.message)
    }
  }

  render() {
    return (
      <div>
        <h1 className='register-h1'>Novo usuário</h1>
        <form onSubmit={this.register} id='register'>
          <label>Nome:</label>
          <input 
            autoFocus
            type='text'
            autoComplete='off'
            value={this.state.nome}
            placeholder='Seu nome aqui'
            onChange={e => this.setState({ nome: e.target.value })}
          />
          <label>Email:</label>
          <input 
            type='email'
            autoComplete='off'
            value={this.state.email}
            placeholder='email@exemplo.com'
            onChange={e => this.setState({ email: e.target.value })}
          />
          <label>Senha:</label>
          <input 
            type='password'
            autoComplete='off'
            placeholder='**********'
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type='submit'>Cadastrar</button>
          <Link to='/login'>Já tenho uma conta</Link>
        </form>
      </div>
    )
  }
}

export default withRouter(Register)