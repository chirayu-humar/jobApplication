import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Navbar = props => {
  const LogMeOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="navbarOuter">
      {/* first div */}
      <div className="firstDivNav">
        <Link to="/">
          <img
            alt="website logo"
            className="temp"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
      </div>
      {/* second div */}
      <ul className="secondDivNav">
        <li>
          <Link to="/">
            <p className="special">Home</p>
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <p className="special">Jobs</p>
          </Link>
        </li>
        <li>temp</li>
      </ul>
      {/* third div */}
      <div>
        <button onClick={LogMeOut} className="LogoutBtn" type="button">
          Logout
        </button>
      </div>
      {/* third div ended */}
    </div>
  )
}

export default withRouter(Navbar)
