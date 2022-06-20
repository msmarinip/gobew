import React, { useEffect, useState } from 'react'
import ReviewForm from './ReviewForm'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CHECK_LOGIN } from '../../redux/actions'
const { REACT_APP_APIURL } = process.env
const ReviewsFormContainer = () => {
    const data = useParams()
    const dispatch = useDispatch()
    const [orderReview, setorderReview] = useState([])
    useEffect(()=>{
        dispatch(CHECK_LOGIN())
    },[])
    useEffect(() => {
        fetch(`${REACT_APP_APIURL}reviews/byOrder/${data.orderId}`)
            .then(res => res.json())
            .then(data => setorderReview(data.reviews))
            .catch(err => err)
    }, [])
    let exist = orderReview.find(item => item.orderId == data.orderId && item.productId == data.productId && item.userId == data.userId)
    return (
        <div>
            {
                exist ? <h1>Ya has comentado este producto</h1> : <ReviewForm orderId={data.orderId} productId={data.productId} userId={data.userId} />
            }
        </div>
    )
}

export default ReviewsFormContainer