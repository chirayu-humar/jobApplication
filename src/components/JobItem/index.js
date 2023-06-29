import './index.css'
import {Link} from 'react-router-dom'

const JobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details
  return (
    <Link to={`/jobs/${id}`}>
      <li className="outerItem">
        <p>upcomming</p>
        {/* first div */}
        <div className="firstItemDiv">
          <div className="companyImgContainer">
            <img alt="company logo" className="logo" src={companyLogoUrl} />
          </div>
          <div>
            <h1>{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        {/* second div */}
        <div className="secondItemDiv">
          <div className="secondInner">
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
          <div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        {/* third div */}
        <div className="thirdItemDiv">
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
        {/* third div ended */}
      </li>
    </Link>
  )
}

export default JobItem
