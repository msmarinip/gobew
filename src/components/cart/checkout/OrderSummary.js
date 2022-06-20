import React from 'react'
const { REACT_APP_CLOUDINARY_RES } = process.env
const OrderSummary = ({ cart }) => {
    return (
        <div className='orderSummary'>
            <p>Resumen de Tu compra:</p>

            <p>Total: ${cart?.reduce((acc, item) => acc + item.productPrice * item.quantity, 0).toLocaleString('de-DE')}</p>
            {cart?.map(item => { return <div className='orderSummary__item'><img src={`${REACT_APP_CLOUDINARY_RES}${item.images[0].imageName}`} alt="" srcset="" />   <p>{item.productName}</p> <p>x{item.quantity}</p> <p>${item.productPrice.toLocaleString('de-DE')}</p> </div> })}
        </div>
    )
}

export default OrderSummary