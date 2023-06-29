import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  onChangeUsername = event => {
    const {value} = event.target
    this.setState({
      username: value,
    })
  }

  onChangePassword = event => {
    const {value} = event.target
    this.setState({
      password: value,
    })
  }

  LogMeIN = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const data = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jsonData = await response.json()
      console.log(jsonData)
      const jwtToken = jsonData.jwt_token
      const {history} = this.props
      console.log(jwtToken)
      if (jwtToken === undefined) {
        history.replace('/login')
      }
      Cookies.set('jwt_token', jwtToken, {expires: 1})
      history.replace('/')
    } else {
      const jsonData = await response.json()
      this.setState({
        isError: true,
        errorMsg: jsonData.error_msg,
      })
    }
  }

  render() {
    const {username, password, isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-containerLogin">
        <form onSubmit={this.LogMeIN} className="specialForm">
          <div className="firstDiv">
            <img
              alt="website logo"
              className="temp"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>
          <div className="secondDiv">
            <label htmlFor="username">username</label>
            <input
              onChange={this.onChangeUsername}
              type="text"
              id="username"
              placeholder="Username"
            />
            <label htmlFor="password">password</label>
            <input
              onChange={this.onChangePassword}
              type="password"
              id="password"
              placeholder="Password"
            />
            <button className="Btn" type="submit">
              Login
            </button>
            {isError && <p>{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
