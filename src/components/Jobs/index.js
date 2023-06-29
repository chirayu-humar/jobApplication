import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import ThemeContext from '../../context/ThemeContext'
import JobItem from '../JobItem'
import EmploymentTypeElement from '../EmploymentTypeElement'
import SalaryRangeElement from '../SalaryRangeElement'

class Jobs extends Component {
  state = {
    selectedEmploymentTypes: [],
    selectedSalaryRanges: '',
    searchInput: '',
    jobs: [],
    profileDetails: {},
    isLoading: false,
    isProfileReqSuccess: true,
    isJobReqSuccess: true,
  }

  componentDidMount() {
    this.fetchTheData()
    this.fetchProfileDetails()
  }

  fetchProfileDetails = async () => {
    this.setState({
      isProfileReqSuccess: true,
    })
    const url = 'https://apis.ccbp.in/profile'
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
      const profileDetails = jsonData.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
      })
    } else {
      this.setState({
        isProfileReqSuccess: false,
      })
    }
  }

  selectTheFilterForEmploymentType = event => {
    const {id} = event.currentTarget
    console.log(id)
    const element = document.getElementById(id)
    console.log(element.checked)
    if (element.checked) {
      this.setState(
        prevState => ({
          selectedEmploymentTypes: [...prevState.selectedEmploymentTypes, id],
        }),
        this.fetchTheData,
      )
    } else {
      this.setState(
        prevState => ({
          selectedEmploymentTypes: prevState.selectedEmploymentTypes.filter(
            eachItem => eachItem !== id,
          ),
        }),
        this.fetchTheData,
      )
    }
  }

  uncheckOthers = event => {
    const radioButtons = document.getElementsByName('option')
    const {id} = event.target
    for (let i = 0; i < radioButtons.length; i += 1) {
      if (radioButtons[i].id !== id) {
        radioButtons[i].checked = false
      }
    }
    this.setState(
      {
        selectedSalaryRanges: id,
      },
      this.fetchTheData,
    )
  }

  selectTheFilterForSalaryRange = event => {
    const {id} = event.currentTarget
    console.log(id)
    const element = document.getElementById(id)
    console.log(element.checked)
    if (element.checked) {
      this.setState(
        prevState => ({
          selectedSalaryRanges: id,
        }),
        this.fetchTheData,
      )
    } else {
      this.setState(
        prevState => ({
          selectedSalaryRanges: prevState.selectedSalaryRanges.filter(
            eachItem => eachItem !== id,
          ),
        }),
        this.fetchTheData,
      )
    }
  }

  fetchTheData = async () => {
    this.setState({
      isLoading: true,
      isJobReqSuccess: true,
    })
    const {
      selectedEmploymentTypes,
      selectedSalaryRanges,
      searchInput,
    } = this.state
    const EmploymentTypes = selectedEmploymentTypes.join(',')
    console.log(EmploymentTypes)
    const url = `https://apis.ccbp.in/jobs?employment_type=${EmploymentTypes}&minimum_package=${selectedSalaryRanges}&search=${searchInput}`
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
      const {jobs} = jsonData
      const JOBS = jobs.map(eachItem =>
        this.changeSnakeCaseToCamelCase(eachItem),
      )
      console.log(JOBS)
      this.setState({
        jobs: JOBS,
        isLoading: false,
      })
    } else {
      this.setState({
        isLoading: false,
        isJobReqSuccess: false,
      })
    }
  }

  changeTheSearchInput = event => {
    const {value} = event.target
    this.setState({
      searchInput: value,
    })
  }

  changeSnakeCaseToCamelCase = object => ({
    companyLogoUrl: object.company_logo_url,
    employmentType: object.employment_type,
    id: object.id,
    jobDescription: object.job_description,
    location: object.location,
    packagePerAnnum: object.package_per_annum,
    rating: object.rating,
    title: object.title,
  })

  render() {
    const {
      selectedEmploymentTypes,
      selectedSalaryRanges,
      jobs,
      profileDetails,
      isLoading,
      isJobReqSuccess,
      isProfileReqSuccess,
    } = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {employmentTypesList, salaryRangesList} = value
          return (
            <div className="bg-containerJobs">
              <Navbar />
              <div className="bottomContainerJobs">
                {/* first div */}
                <form className="JobsFirstDiv">
                  {isProfileReqSuccess && (
                    <div className="profileContainer">
                      <img alt="profile" src={profileDetails.profileImageUrl} />
                      <h1>{profileDetails.name}</h1>
                      <p>{profileDetails.shortBio}</p>
                    </div>
                  )}
                  {!isProfileReqSuccess && (
                    <div>
                      <button onClick={this.fetchProfileDetails} type="button">
                        Retry
                      </button>
                    </div>
                  )}
                  <hr />
                  <div>
                    <h1>Type of Employment</h1>
                    <ul>
                      {employmentTypesList.map(eachItem => (
                        <EmploymentTypeElement
                          key={eachItem.employmentTypeId}
                          selectTheFilterForEmploymentType={
                            this.selectTheFilterForEmploymentType
                          }
                          eachItem={eachItem}
                        />
                      ))}
                    </ul>
                  </div>
                  <hr />
                  <div>
                    <h1>Salary Range</h1>
                    <ul>
                      {salaryRangesList.map(eachItem => (
                        <SalaryRangeElement
                          key={eachItem.salaryRangeId}
                          uncheckOthers={this.uncheckOthers}
                          eachItem={eachItem}
                        />
                      ))}
                    </ul>
                  </div>
                </form>
                {/* second div */}
                <div className="JobsSecondDiv">
                  <div className="rowWise">
                    <input onChange={this.changeTheSearchInput} type="search" />
                    <div>
                      <button
                        onClick={this.fetchTheData}
                        type="button"
                        data-testid="searchButton"
                      >
                        <BsSearch className="search-icon" />
                      </button>
                    </div>
                  </div>
                  {!isLoading && isJobReqSuccess && (
                    <ul>
                      {jobs.map(eachItem => (
                        <JobItem key={eachItem.id} details={eachItem} />
                      ))}
                    </ul>
                  )}
                  {isLoading && (
                    <div className="loader-container" data-testid="loader">
                      <Loader
                        type="ThreeDots"
                        color="#ffffff"
                        height="50"
                        width="50"
                      />
                    </div>
                  )}
                  {!isLoading && isJobReqSuccess && jobs.length === 0 && (
                    <div>
                      <img
                        alt="no jobs"
                        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                      />
                      <h1>No Jobs Found</h1>
                      <p>We could not find any jobs. Try other filters</p>
                    </div>
                  )}
                  {!isJobReqSuccess && (
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
                </div>
                {/* second div ended */}
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Jobs
