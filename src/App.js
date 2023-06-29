import './App.css'
import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import ThemeContext from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.
// const employmentTypesList =

// const salaryRangesList =

// Replace your code here
class App extends Component {
  state = {
    employmentTypesList: [
      {
        label: 'Full Time',
        employmentTypeId: 'FULLTIME',
      },
      {
        label: 'Part Time',
        employmentTypeId: 'PARTTIME',
      },
      {
        label: 'Freelance',
        employmentTypeId: 'FREELANCE',
      },
      {
        label: 'Internship',
        employmentTypeId: 'INTERNSHIP',
      },
    ],
    salaryRangesList: [
      {
        salaryRangeId: '1000000',
        label: '10 LPA and above',
      },
      {
        salaryRangeId: '2000000',
        label: '20 LPA and above',
      },
      {
        salaryRangeId: '3000000',
        label: '30 LPA and above',
      },
      {
        salaryRangeId: '4000000',
        label: '40 LPA and above',
      },
    ],
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.state
    return (
      <ThemeContext.Provider
        value={{
          employmentTypesList,
          salaryRangesList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/jobs" component={Jobs} />
          <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
