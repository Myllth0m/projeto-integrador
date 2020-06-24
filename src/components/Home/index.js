import React, { Component } from 'react'
import firebase from '../../firebase'
import './home.css'

class Home extends Component {
  state = { posts: [] }

  componentDidMount() {
    firebase.app.ref('posts').once('value', snapshot => {
      let state = this.state
      state.posts = []
      snapshot.forEach(post => {
        state.posts.push({
          key: post.key,
          titulo: post.val().titulo,
          imagem: post.val().imagem,
          descricao: post.val().descricao,
          autor: post.val().autor
        })
      })
      state.posts.reverse()
      this.setState(state)
      console.log(state)
    })
  }
  render() {
    return (
      <section id='post'>
        {this.state.posts.map(post => (
          <article key={post.key}>
            <header>
              <div className='title'>
                <strong>{post.titulo}</strong>
                <span>{post.autor}</span>
              </div>
            </header>
            <img src={post.imagem} alt={post.titulo} />
            <footer>
              <p>{post.descricao}</p>
            </footer>
          </article>
        ))}
      </section>
    )
  }
}

export default Home