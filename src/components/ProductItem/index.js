import {useState} from 'react'
import {MdCurrencyRupee} from 'react-icons/md'
import {GoPlus} from 'react-icons/go'
import {FaMinus} from 'react-icons/fa6'

import CartContext from '../../context/CartContext'
import './index.css'

const ProductItem = props => {
  const [quantity, setQuantity] = useState(1)
  const [showQuantityControl, setQuantityControl] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        const {product} = props
        const {id, name, weight, price, image} = product
        const actualPrice = parseFloat(price.slice(1)).toFixed(2)

        const increaseProductQuantity = () => {
          setQuantity(prevQuantity => prevQuantity + 1)
          addCartItem({...product, quantity})
        }

        const decreaseProductQuantity = () => {
          if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1)
            addCartItem({...product, quantity: quantity - 1})
            console.log(quantity)
          }
          if (quantity === 0) {
            setQuantityControl(false)
          }
        }

        const handleQuantity = () => {
          setQuantityControl(true)
          addCartItem({...product, quantity})
        }

        return (
          <div className="product-list-container">
            <li>
              <img src={image} alt={name} className="product-image" />
              <div className="content-container">
                <div>
                  <p className="name">{name}</p>
                  <p className="description">{weight}</p>
                  <p className="price-tag">
                    <MdCurrencyRupee /> {actualPrice}
                  </p>
                </div>
                <div>
                  {showQuantityControl ? (
                    <div className="button-container">
                      <button
                        onClick={decreaseProductQuantity}
                        className="quantity-btn"
                        data-testid="decrement-count"
                      >
                        <FaMinus />
                      </button>
                      <p data-testid="active-count">{quantity}</p>
                      <button
                        onClick={increaseProductQuantity}
                        className="quantity-btn"
                        data-testid="increment-count"
                      >
                        <GoPlus />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="add-btn"
                      onClick={handleQuantity}
                      data-testid="add-button"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </li>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default ProductItem
