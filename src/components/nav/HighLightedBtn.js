import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { GET_HIGHLIGHTED, GET_PRODUCTS } from '../../redux/actions'

const HighLightedBtn = () => {
    const [highLighted, setHighLighted] = useState(false)
    const dispatch = useDispatch()
    const handleClick = () => {
        setHighLighted(!highLighted)
        if (highLighted) {
            dispatch(GET_HIGHLIGHTED())
        } else {
            dispatch(GET_PRODUCTS())
        }

    }
    return (
        <>
            <button onClick={handleClick}>Productos Destacados</button>
        </>
    )
}

export default HighLightedBtn