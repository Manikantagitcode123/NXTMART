import {Component} from 'react'
import './index.css'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
class Login extends Component {
  state = {
    username: '',
    password: '',
    iserrorshow: false,
    errormsg: '',
    passwordishide: true,
  }
  ispasswordvisible = event => {
    this.setState(prevestate => ({passwordishide: !prevestate.passwordishide}))
  }
  usernameenter = event => {
    this.setState({username: event.target.value})
  }
  passwordchange = event => {
    this.setState({password: event.target.value})
  }
  submitdata = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const data = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    //console.log(response)
    if (response.ok == true) {
      const jsondata = await response.json()
      const jwttoken = jsondata.jwt_token
      //console.log(jsondata)
      Cookies.set('jwt_token', jwttoken, {expires: 6})
      //console.log(jwttoken)
      this.setState({username: '', password: ''})
      const {history} = this.props
      history.replace('/')
    } else {
      console.log(response)
      const jsondata = await response.json()
      const errormsg = jsondata.error_msg
      console.log(errormsg)
      this.setState({errormsg: errormsg, iserrorshow: true})
    }
  }

  render() {
    const {iserrorshow, errormsg, passwordishide} = this.state
    const passwordhide = passwordishide ? 'password' : 'text'
    //console.log(passwordhide)
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="form-bg-container">
          <form className="page_form" onSubmit={this.submitdata}>
            <img
              className="img1"
              src="https://res.cloudinary.com/dzjxowhgb/image/upload/v1713437200/fs5mz1wrydb4cdtfvbcl.png"
              alt="login website logo"
            />
            <div className="input-card">
              <label htmlFor="usernameinput" className="input_username_label">
                USERNAME
              </label>
              <input
                id="usernameinput"
                type="text"
                className="input_username"
                onChange={this.usernameenter}
              />
              <label
                className="input_username_label"
                htmlFor="userpasswordinput"
              >
                PASSWORD
              </label>
              <input
                id="userpasswordinput"
                type={passwordhide}
                className="input_password"
                onChange={this.passwordchange}
              />
              <input
                id="checkboxid"
                className="checkbox1"
                type="checkbox"
                onClick={this.ispasswordvisible}
              />
              <label htmlFor="checkboxid" className="checkbox_label">
                Show Password
              </label>
              <button className="button_login" type="submit">
                Login
              </button>
              {iserrorshow ? (
                <p className="errormsg">{errormsg}</p>
              ) : (
                <p className="noterror"></p>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
