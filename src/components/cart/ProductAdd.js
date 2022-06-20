import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_TOTAL, ADD_TO_CART, CREATE_USER_CART, UPDATE_USER_CART, SET_CART } from '../../redux/actions'
import { toast } from 'react-toastify';
const ProductAdd = ({ stock, price, product }) => {
    const dispatch = useDispatch()
    const { cart, totalCart, userId, orderId } = useSelector(state => state.clientReducer)
    const [localCount, setLocalCount] = useState(1)
    const addQuantity = () => {
        if (localCount < stock) {
            setLocalCount(localCount + 1)
        }
    }
    const removeQuantity = () => {
        if (localCount > 1) {
            setLocalCount(localCount - 1)
        }
    }
    const addToCart = (e) => {
        e.preventDefault()
        let limit = cart.find(e => e._id === product._id)
        if (limit?.quantity >= stock) {
            toast.info("Ya no hay stock de ese producto")
            setLocalCount(1)

            return
        }
        dispatch(ADD_TO_CART(product, localCount))
        dispatch(SET_TOTAL(totalCart + (localCount * price)))
        setLocalCount(1)
        toast.success(
            `${product.productName} agregado al carrito`,
        )
        if (userId) {
            if (orderId) {
                let token = localStorage.getItem('token')
                dispatch(UPDATE_USER_CART({ product, userId, totalCart, cart, quantity: localCount, token, orderId }))
                return
            }
            let token = localStorage.getItem('token')
            dispatch(CREATE_USER_CART({ product, userId, totalCart, cart, quantity: localCount, token }))
        }
    }
    useEffect(() => {
        if (!userId) {
            localStorage.setItem('cart', JSON.stringify(cart))
            localStorage.setItem('totalCart', JSON.stringify(totalCart))
        } else {
            localStorage.removeItem('cart')
            localStorage.removeItem('totaCart')
        }
    }, [cart, totalCart])





    return (
        <form onSubmit={addToCart} className="productCard__addToCart" >
            <button type="submit" className="productCard__addToCart--add" >
                Agregar
            </button>
            <button type="button" onClick={removeQuantity} className="productCard__addToCart---" > - </button>
            <span className="productCard__addToCart--count" >{localCount}</span>
            <button type="button" onClick={addQuantity} className="productCard__addToCart--addition" > + </button>
        </form>
    )
}

export default ProductAdd