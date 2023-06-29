import './index.css'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

const Home = () => (
  <div className="bg-containerHome">
    <Navbar />
    <div className="bottomContainer">
      <h1>Find the job that fits your life</h1>
      <p>millions of people are searching for jobs</p>
      <div>
        <Link to="/jobs">
          <button className="lightColor" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
