import './index.css'
const EachCatagorie = props => {
  const {details, selecteditemuser, isseleted} = props
  const bgcolorforitem = isseleted ? 'bgcolor' : 'notupplybgcolor'
  //onsole.log(details)
  const selectedel = () => {
    selecteditemuser(details)
  }

  const {name} = details
  //console.log(details)

  return (
    <li>
      <button className={bgcolorforitem} onClick={selectedel}>
        {name}
      </button>
    </li>
  )
}
export default EachCatagorie
