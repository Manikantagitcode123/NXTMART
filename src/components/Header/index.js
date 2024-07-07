import {Link, withRouter} from 'react-router-dom'
import {FiHome, FiShoppingCart} from 'react-icons/fi'
import Cookies from 'js-cookie'
import {TbLogout2} from 'react-icons/tb'
import './index.css'

const Header = props => {
  let homebntcss = 'njkedn'
  let cartbtncss = 'ecsf'
  const {history} = props
  console.log(history)
  const isclickedbtn = history.location.pathname
  if (isclickedbtn == '/') {
    homebntcss = 'darkgreen'
  } else {
    homebntcss = 'notdarkgreen'
  }
  if (isclickedbtn == '/cart') {
    cartbtncss = 'darkgreen'
  } else {
    cartbtncss = 'notdarkgreen'
  }
  const onClickLogout = () => {
    const {history} = props
    //console.log(history)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dzjxowhgb/image/upload/v1713445237/k1kkhqz707ant6hdvxtp.png"
          alt="website logo"
          className="website-logo"
          width="80"
        />
      </Link>
      <div className="nav-links">
        <Link to="/" className="Links" className={homebntcss}>
          <FiHome className={`logo ${homebntcss}`} size={18} /> Home
        </Link>
        <Link to="/cart" className="Links">
          <FiShoppingCart className={`logo ${cartbtncss}`} size={18} />
          <button type="button" className={`cart-btn ${cartbtncss}`}>
            Cart
          </button>
        </Link>
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          <TbLogout2 size={18} />
          Logout
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)
