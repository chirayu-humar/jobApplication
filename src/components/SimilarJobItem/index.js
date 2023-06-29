import './index.css'

const SimilarJobItem = props => {
  const {each} = props
  return (
    <li className="similarJobContainer">
      {/* first div */}
      <div className="similarJobInner1">
        <img
          alt="similar job company logo"
          className="logoimage"
          src={each.companyLogoUrl}
        />
        <div>
          <h1>{each.title}</h1>
          <p>{each.rating}</p>
        </div>
      </div>
      {/* second div */}
      <div className="similarJobInner2">
        <h1>Description</h1>
        <p>{each.jobDescription}</p>
      </div>
      {/* third div */}
      <div className="similarJobInner3">
        <p>{each.location}</p>
        <p>{each.employmentType}</p>
      </div>
      {/* fourth div */}
    </li>
  )
}

export default SimilarJobItem
