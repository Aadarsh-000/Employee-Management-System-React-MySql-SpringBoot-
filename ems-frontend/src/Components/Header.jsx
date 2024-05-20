import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-dark bg-dark'>
            <Link className="navbar-brand" to="/"><span className='mx-2'>Employee Management System</span></Link>
            </nav>
        </header>
    </div>
  )
}

export default Header