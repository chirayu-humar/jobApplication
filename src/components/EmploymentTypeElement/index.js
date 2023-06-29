import './index.css'

const EmploymentTypeElement = props => {
  const {eachItem, selectTheFilterForEmploymentType} = props
  return (
    <li className="listItem">
      <input
        id={eachItem.employmentTypeId}
        onClick={selectTheFilterForEmploymentType}
        type="checkbox"
      />
      <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
    </li>
  )
}

export default EmploymentTypeElement
