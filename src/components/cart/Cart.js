import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CLEAN_CART, DELETE_USER_CART } from '../../redux/actions'
import CardItem from './CardItem'

const Cart = ({ totalCart, cart }) => {
    const { userId, orderId } = useSelector(state => state.clientReducer)
    const dispatch = useDispatch()
    const cleanCart = () => {
        if (userId) {
            dispatch(DELETE_USER_CART({ orderId, token: localStorage.getItem('token') }))
            return
        } else {
            localStorage.removeItem('cart')
            localStorage.removeItem('totalCart')
            dispatch(CLEAN_CART())
        }
    }
    return (
        <section className='cart'>
            {cart.length > 0 && <button onClick={cleanCart} className="cart__cleanCart" > Limpiar Carrito</button>}
            {cart?.map(i => <CardItem key={i._id} {...i} totalCart={totalCart} />)}
            <h6 className='cart__totalCart' >${totalCart?.toLocaleString('de-DE')}</h6>
            <Link to={userId ? "/address" : "/login"} className='cart__link' ><button className='cart__link--button' >Comprar</button></Link>
        </section >
    )
}

export default Cart


