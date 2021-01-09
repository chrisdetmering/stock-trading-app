import React from 'react'
import Register from '../../Static_Components/Register'
import Login from '../../Static_Components/Login'
import './Home.css'
import Welcome from '../../Static_Components/Welcome'

export default function Home() {
  if (!localStorage.getItem('data')) {
    return (
      <div id="home">
        <div className="home-content">
          <h1>Welcome to Fantasy Stock Trader!</h1>
          <p>Experience the thrill of the stock market by utilizing fake money to purchase real stocks and buy or sell shares.</p>
          <div className="home-buttons-wrapper">
            <Register />
            <Login />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <Welcome />
    )
  }
}
