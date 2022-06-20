import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_WISHES } from '../../redux/actions'
import { BsSuitHeartFill } from 'react-icons/bs';
const { REACT_APP_CLOUDINARY_RES, REACT_APP_APIURL } = process.env

const WishListToggle = ({ _id }) => {
    const { userId, wishes } = useSelector(state => state.clientReducer)
    const dispatch = useDispatch()
    const [isWished, setIsWished] = useState(Boolean(wishes.find(wish => wish.productId === _id)))
    const handleClick = () => {
        fetch(`${REACT_APP_APIURL}wishlist/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                userId,
                productId: _id
            })
        }).then(res => res.json())
            .then(data => {
                dispatch(GET_WISHES(userId))
                console.log(data);
            })
    }
    useEffect(() => {
        setIsWished(Boolean(wishes.find(wish => wish.productId === _id)))

        return () => {

        }
    }, [wishes])
    return (<>
        {userId && <BsSuitHeartFill onClick={handleClick} className={isWished ? 'wished' : "notWished"} style={{ margin: "1%" }} />}
    </>
    )
}

export default WishListToggle