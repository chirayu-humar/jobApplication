import './index.css'

const SalaryRangeElement = props => {
  const {eachItem, uncheckOthers} = props
  return (
    <li className="listItem">
      <input
        id={eachItem.salaryRangeId}
        name="option"
        onClick={uncheckOthers}
        type="radio"
      />
      <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
    </li>
  )
}

export default SalaryRangeElement
