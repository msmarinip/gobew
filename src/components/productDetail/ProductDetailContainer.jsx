import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GET_PRODUCT_BY_ID, CLEAN_UP_DETAILS, CHECK_LOGIN, GET_WISHES, SEARCH_BY_ID } from '../../redux/actions'
import ProductDetail from './ProductDetail'
const { REACT_APP_APIURL } = process.env

export default function ProductDetailContainer() {

    const { product, userId } = useSelector((store) => store.clientReducer)
    const { id } = useParams()
    const [reviews, setReviews] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(CHECK_LOGIN())
        dispatch(GET_PRODUCT_BY_ID(id))
        if (userId) {
            dispatch(GET_WISHES(userId))
        }
        return () => {
            dispatch(CLEAN_UP_DETAILS())
        }
    }, [dispatch, id])
    useEffect(() => {
        dispatch(SEARCH_BY_ID(userId))
    }, []);

    useEffect(() => {
        fetch(`${REACT_APP_APIURL}reviews/byProduct/${id}`)
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
            .catch(err => err)
    }, [id])
    return (
        <ProductDetail product={product} reviews={reviews.reviews} />
    )
}
