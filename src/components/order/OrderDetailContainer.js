import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CHECK_LOGIN } from '../../redux/actions'
import OrderDetail from './OrderDetail'
const { REACT_APP_APIURL } = process.env
const OrderDetailContainer = () => {
    const { id } = useParams()
    const { userId } = useSelector(state => state.clientReducer)
    const dispatch = useDispatch()
    const [orderData, setOrderData] = useState({})
    const [addressData, setAddressData] = useState({})
    const [rev, setRev] = useState([])
    useEffect(() => {
        dispatch(CHECK_LOGIN())
    }, [])

    useEffect(() => {
        fetch(`${REACT_APP_APIURL}payments/order/byId/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "x-token": localStorage.getItem('token')
                }
            }
        ).then(res => res.json()).then(data => { setOrderData(data) })
    }, [id])

    useEffect(() => {
        if (orderData.ok) {

            fetch(`${REACT_APP_APIURL}address/byOrder/${orderData.obj._id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "x-token": localStorage.getItem('token')
                    }
                }
            ).then(res => res.json()).then(data => setAddressData(data))
        }

    }, [orderData])
    useEffect(() => {
        fetch(`${REACT_APP_APIURL}reviews/byOrder/${id}`)
            .then(res => res.json())
            .then(data => setRev(data.reviews))
            .catch(err => err)
    }, [id])

    return (
        <section className='orderDetails'>
            {(userId && orderData?.obj?.userId == userId) ? <OrderDetail reviews={rev} {...orderData.obj} {...addressData.address} userId={userId} /> : <h1>Estas un poco perdido... Dejame que te lleve a tus ordenes</h1>}
        </section>
    )
}

export default OrderDetailContainer