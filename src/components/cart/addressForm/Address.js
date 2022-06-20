import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHECK_LOGIN, GET_USER_CART } from '../../../redux/actions'
import OrderExist from './OrderExist'
import OrderForm from './OrderForm'
const { REACT_APP_APIURL } = process.env
const Address = () => {
    const { userId, orderId } = useSelector(state => state.clientReducer)
    const dispatch = useDispatch()
    const [userAddress, setUserAddress] = useState([])
    useEffect(() => {
        dispatch(CHECK_LOGIN())


    }, [userId])
    useEffect(() => {
        setUserAddress([])
        fetch(`${REACT_APP_APIURL}address/byUser/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem('token')
            }
        }
        )
            .then(res => res.json())
            .then(data => { setUserAddress(data.addresses) })
        return () => {
            setUserAddress([])
        }
    }, [userId])


    return (
        <section className='orderForm__container'>
            <OrderForm userId={userId} orderId={orderId} />
            {userAddress.length > 0 && <OrderExist userAddress={userAddress} />}
        </section>
    )
}

export default Address