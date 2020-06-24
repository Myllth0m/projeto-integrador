import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'

import './new.css'

class New extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titulo: '',
      imagem: '',
      descricao: '',
      alert: ''
    }
    this.criar = this.criar.bind(this)
    this.onCriar = this.onCriar.bind(this)
  }

  componentDidMount() {
    if(!firebase.getCurrent()) {
      this.props.history.replace('/')
      return null
    }
  }

  criar = e => {
    e.preventDefault()
    this.onCriar()
  }

  onCriar = async () => {
    const { titulo, imagem, descricao } = this.state
    if(titulo !== '' && imagem !== '' && descricao !== '') {
      let post = firebase.app.ref('posts')
      let chave = post.push().key
      await post.child(chave).set({
        titulo, imagem, descricao, autor: firebase.getCurrent()
      })
      this.props.history.replace('/dashboard')
    } else {
      this.setState({alert: 'Preencha todos os campos'})
    }
  }

  render() {
    return (
      <div>
        <header id='new'>
          <Link to='/dashboard'>Voltar</Link>
        </header>
        <form onSubmit={this.criar} id='new-post'>
          <span>{this.state.alert}</span>
          <label>Título:</label>
          <br/>
          <input
            autoFocus
            type='text'
            autoComplete='off'
            value={this.state.titulo}
            placeholder='Título do post'
            onChange={e => this.setState({ titulo: e.target.value })}
          />
          <br/>
          <label>Url da imagem:</label>
          <br/>
          <input
            type='text'
            autoComplete='off'
            value={this.state.imagem}
            placeholder='Url da capa do post'
            onChange={e => this.setState({ imagem: e.target.value })}
          />
          <br/>
          <label>Descrição:</label>
          <br/>
          <textarea
            type='text'
            autoComplete='off'
            value={this.state.descricao}
            placeholder='Descrição do post'
            onChange={e => this.setState({ descricao: e.target.value })}
          />
          <br/>
          <button type='submit'>Criar</button>
        </form>
      </div>
    )
  }
}

export default withRouter(New)