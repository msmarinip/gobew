import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { REMOVE_FROM_CART, SET_TOTAL, ADD_ONE_CART, REMOVE_ONE_CART, REMOVE_ONE_USER_CART, ADD_ONE_USER_CART, DELETE_PRODUCT_USER } from '../../redux/actions'
const { REACT_APP_CLOUDINARY_RES } = process.env
// { _id, images, quantity, productPrice, productName, totalCart, productStock, }
const CardItem = (props) => {
  const { _id, images, quantity, productPrice, productName, totalCart, productStock, } = props
  const dispatch = useDispatch()
  const { cart, orderId, userId } = useSelector(state => state.clientReducer)
  const [img, setImg] = useState(0)
  useEffect(() => {
    if (!userId) {
      localStorage.setItem('cart', JSON.stringify(cart))
      localStorage.setItem('totalCart', JSON.stringify(totalCart))
    }
  }, [cart, totalCart])

  const CarouselImagesPrev = () => {
    if (img > 0) {
      setImg(img - 1)
    }
  }
  const CarouselImagesNext = () => {
    if (img < images?.length - 1) {
      setImg(img + 1)
    }
  }
  const addOneToCart = () => {
    if (quantity >= productStock) { return }
    if (userId) {
      if (orderId) {
        let token = localStorage.getItem('token')
        dispatch(ADD_ONE_USER_CART({ userId, totalCart, cart, productId: _id, token, orderId }))
      }
    }
    dispatch(ADD_ONE_CART(_id))
    dispatch(SET_TOTAL(totalCart + productPrice))
  }
  const removeOneOfCart = () => {
    if (userId) {
      if (orderId) {
        let token = localStorage.getItem('token')
        dispatch(REMOVE_ONE_USER_CART({ userId, totalCart, cart, productId: _id, token, orderId }))
      }
    }
    dispatch(REMOVE_ONE_CART(_id))
    if (totalCart > 0) dispatch(SET_TOTAL(totalCart - productPrice))
  }
  const removeFromCart = () => {
    if (userId) {
      if (orderId) {
        let token = localStorage.getItem('token')
        dispatch(DELETE_PRODUCT_USER({ userId, totalCart, cart, productId: _id, token, orderId }))
      }
    }
    localStorage.removeItem('cart')
    localStorage.removeItem('totalCart')
    dispatch(REMOVE_FROM_CART(_id))
    dispatch(SET_TOTAL(totalCart - productPrice * quantity))

  }
  return (
    <article className='cartItem' >
      {/* {images?.length >= 2 && <button onClick={CarouselImagesPrev}>{"<"}</button>} */}
      <Link to={`/productDetail/${_id}`} className='cartItem__img--container'>

        {images && <img src={`${REACT_APP_CLOUDINARY_RES}${images[0]?.imageName}`} alt={images.imageAlt} className='cartItem__img' />}


      </Link>
      {/* {images?.length >= 2 && <button onClick={CarouselImagesNext}>{">"}</button>} */}
      <p className='cartItem__productName' >{productName}</p>

      <p className='cartItem__productPrice' >${productPrice?.toLocaleString('de-DE')}</p>
      <button onClick={removeOneOfCart} className='cartItem__less' > - </button>
      <p className='cartItem__productQuantity' >{quantity}</p>
      <button onClick={addOneToCart}
        className='cartItem__more' > + </button>
      <button onClick={removeFromCart} className='cartItem__erase' >Eliminar</button>
    </article>
  )
}

export default CardItem
