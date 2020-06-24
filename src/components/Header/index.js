import React from 'react'
import { Link } from 'react-router-dom'

import './header.css'

const Header = () => (
  <header id='main-header'>
    <div className='header-content'>
      <div>
        <Link to='/home'>I Love Hentai</Link>
      </div>
      <div>
        <Link to='/register' id='criar-conta'>Criar conta</Link>
        <Link to='/login'>Entrar</Link>
      </div>
    </div>
  </header>
)

export default Header
