import './index.css'

const SkillItem = props => {
  const {each} = props
  return (
    <li className="stackContainer">
      <img alt={each.name} src={each.imageUrl} />
      <p>{each.name}</p>
    </li>
  )
}

export default SkillItem
