import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://res.cloudinary.com/dzjxowhgb/image/upload/v1714736344/shopping-cart_isxdqm.png"
      className="cart-empty-img"
      alt="empty cart"
    />
    <h1 className="cart-empty-heading">Your cart is empty</h1>
    <Link to="/">
      <button type="button" className="shop-now-btn">
        Shop Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
