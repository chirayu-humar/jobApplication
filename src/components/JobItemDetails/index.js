import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import SimilarJobItem from '../SimilarJobItem'
import SkillItem from '../SkillItem'

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    lifeAtCompany: {},
    skills: [],
    similarJobs: [],
    isLoading: false,
    isReqSuccess: true,
  }

  componentDidMount() {
    this.fetchTheData()
  }

  snakeToCamelForSkills = object => ({
    name: object.name,
    imageUrl: object.image_url,
  })

  snakeToCamelForSimilarJobs = object => ({
    companyLogoUrl: object.company_logo_url,
    employmentType: object.employment_type,
    id: object.id,
    jobDescription: object.job_description,
    location: object.location,
    rating: object.rating,
    title: object.title,
  })

  fetchTheData = async () => {
    this.setState({
      isLoading: true,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jsonData = await response.json()
      console.log(jsonData)
      const jobDetails = {
        companyLogoUrl: jsonData.job_details.company_logo_url,
        companyWebsiteUrl: jsonData.job_details.company_website_url,
        employmentType: jsonData.job_details.employment_type,
        id: jsonData.job_details.id,
        jobDescription: jsonData.job_details.job_description,
        location: jsonData.job_details.location,
        packagePerAnnum: jsonData.job_details.package_per_annum,
        rating: jsonData.job_details.rating,
        title: jsonData.job_details.title,
      }
      const lifeAtCompany = {
        description: jsonData.job_details.life_at_company.description,
        imageUrl: jsonData.job_details.life_at_company.image_url,
      }
      const skills = jsonData.job_details.skills.map(each =>
        this.snakeToCamelForSkills(each),
      )
      const similarJobs = jsonData.similar_jobs.map(each =>
        this.snakeToCamelForSimilarJobs(each),
      )
      console.log(jobDetails)
      console.log(lifeAtCompany)
      console.log(skills)
      console.log(similarJobs)
      this.setState({
        jobDetails,
        lifeAtCompany,
        skills,
        similarJobs,
        isLoading: false,
      })
    } else {
      this.setState({
        isReqSuccess: false,
      })
    }
  }

  render() {
    const {
      jobDetails,
      lifeAtCompany,
      skills,
      similarJobs,
      isLoading,
      isReqSuccess,
    } = this.state
    return (
      <div className="jobDetailsBackground">
        <Navbar />
        <div className="bottomContainerJobItemDetails">
          <div className="innerJobItemDetailContainer">
            {/* first div */}
            {!isLoading && isReqSuccess && (
              <div className="special1">
                <div className="companyLogoContainer">
                  <img
                    alt="job details company logo"
                    className="logoContainer"
                    src={jobDetails.companyLogoUrl}
                  />
                </div>
                <div>
                  <p>{jobDetails.title}</p>
                  <p>{jobDetails.rating}</p>
                </div>
              </div>
            )}
            {/* second div  */}
            {!isLoading && isReqSuccess && (
              <div className="special2">
                <div className="special2inner">
                  <p>{jobDetails.location}</p>
                  <p>{jobDetails.employmentType}</p>
                </div>
                <p>{jobDetails.packagePerAnnum}</p>
              </div>
            )}
            <hr />
            {/* third div */}
            {!isLoading && isReqSuccess && (
              <div className="special3">
                <div className="special3inner">
                  <h1>Description</h1>
                  <p>
                    <a href={jobDetails.companyWebsiteUrl}>Visit</a>
                  </p>
                </div>
                <div>
                  <p>{jobDetails.jobDescription}</p>
                </div>
              </div>
            )}
            {/* fourth div */}
            {!isLoading && isReqSuccess && (
              <ul className="special4">
                <li className="starList">
                  <h1>skills</h1>
                </li>
                {skills.map(each => (
                  <SkillItem key={each.name} each={each} />
                ))}
              </ul>
            )}
            {/* fifth div */}
            {!isLoading && isReqSuccess && (
              <div className="special5">
                <div className="special5inner1">
                  <h1>Life at Company</h1>
                </div>
                <div className="spacial5inner2">
                  <div className="temp1">
                    <p>{lifeAtCompany.description}</p>
                  </div>
                  <div className="temp2">
                    <img alt="life at company" src={lifeAtCompany.imageUrl} />
                  </div>
                </div>
              </div>
            )}
            {/* sisth div */}
            <div className="special6">
              <div className="special6inner1">
                <h1>Similar Jobs</h1>
              </div>
              {!isLoading && isReqSuccess && (
                <ul className="special6inner2">
                  {similarJobs.map(each => (
                    <SimilarJobItem key={each.id} each={each} />
                  ))}
                </ul>
              )}
            </div>
            {/* seventh div */}
            {isLoading && isReqSuccess && (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            )}
            {/* seventh div ended */}
            {!isReqSuccess && (
              <div>
                <img
                  alt="failure view"
                  src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                />
                <h1>Oops! Something Went Wrong</h1>
                <p>We cannot seem to find the page you are looking for</p>
                <button onClick={this.fetchTheData} type="button">
                  Retry
                </button>
              </div>
            )}
            {/* eight div ended */}
          </div>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
