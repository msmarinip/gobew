import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CHECK_LOGIN } from '../../redux/actions'
import AllOrders from './AllOrders'
const { REACT_APP_APIURL } = process.env
const AllOrdersContainer = () => {
    const { userId } = useSelector(state => state.clientReducer)
    const dispatch = useDispatch()
    const [orders, setOrders] = useState([])
    useEffect(() => {
        dispatch(CHECK_LOGIN())
    }, [dispatch])

    useEffect(() => {
        fetch(`${REACT_APP_APIURL}payments/order/getAll/ByUser/${userId}`
            , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(data => {
                setOrders(data);
            })
        return () => {
        }
    }, [userId])


    return (
        <article className='allOrders'>
            <AllOrders orders={orders} setOrders={setOrders} />
        </article>
    )
}

export default AllOrdersContainer