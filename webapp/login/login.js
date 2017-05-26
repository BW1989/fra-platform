import React from 'react'
import { Link } from './../link'
import './style.less'

const Login = () =>
  <div className="login__root">
    <div className="login__box">
      <span className="login__header">Login to FRA Platform</span>
      <div className="input">
        <label htmlFor="un">Email</label>
        <input id="un" type="text"/>
      </div>
      <div className="input">
        <label htmlFor="un">Password</label>
        <input id="un" type="password"/>
      </div>
      <div className="checkbox">
        <input id="un" type="checkbox" disabled="disabled"/>
        <label htmlFor="un" type="text">Remember me on this browser</label>
      </div>
      <Link to="/country/ITA" className="btn-primary login__btn">Sign in</Link>
    </div>
  </div>

export default Login
