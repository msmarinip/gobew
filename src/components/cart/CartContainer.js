import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHECK_LOGIN, GET_USER_CART, GET_WISHES, SET_CART, SET_TOTAL } from '../../redux/actions'
import Cart from './Cart'

const CartContainer = () => {
    const { cart, totalCart, userId } = useSelector(state => state.clientReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            dispatch(CHECK_LOGIN())
            if (userId) {
                dispatch(GET_USER_CART(userId))
                dispatch(GET_WISHES(userId))
                // localStorage.removeItem("cart")
                return
            }
        } else {
            let cartStorage = localStorage.getItem('cart')
            let totalCartStorage = localStorage.getItem('totalCart')
            if (cartStorage && totalCartStorage) {
                let cartStorageParsed = JSON.parse(cartStorage)
                let totalCartStorageParsed = JSON.parse(totalCartStorage)
                dispatch(SET_CART(cartStorageParsed))
                dispatch(SET_TOTAL(totalCartStorageParsed))
            }
        }
    }, [userId, dispatch])
    return (
        <section>
            {cart.length < 1 ? <div className='cart__noItem--container'>< h1 className='cart__noItem'> No hay productos en el carrito</h1></div> :
                <Cart cart={cart} totalCart={totalCart} />
            }
        </section >
    )
}

export default CartContainer