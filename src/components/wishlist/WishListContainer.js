import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHECK_LOGIN } from '../../redux/actions'
import ProductsMap from '../mainContent/ProductsMap'
const { REACT_APP_APIURL } = process.env
const WishListContainer = () => {
    const dispatch = useDispatch()
    const { userId } = useSelector(store => store.clientReducer)

    const [wishes, setWishes] = useState([])
    useEffect(() => {
        if (userId) {

            fetch(`${REACT_APP_APIURL}wishList/getAllByUser/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': localStorage.getItem('token')
                    }
                })
                .then(res => res.json())
                .then(data => {
                    setWishes(data.wishList)
                })
        } else {
            dispatch(CHECK_LOGIN())
        }

    }, [userId])

    let mapedWishes = wishes.map((wish) => {
        return { ...wish.product, images: wish.images, productIsActive: true }
    })


    return (
        <div className='wishList'>
            <h1>Favoritos:</h1>
            <div>
                <ProductsMap products={mapedWishes} />
            </div>
        </div>
    )
}

export default WishListContainer