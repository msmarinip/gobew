import React from 'react'
import { Link } from 'react-router-dom'
const OrderDetail = ({ orderState, orderTotal, user, addressComment, addressStreet, addressNumber, addressCity, orderId, cart, addressProvince, addressFloor, addressZipCode, addressFlat, reviews, userId }) => {
    const orderPosibleStates = {
        0: "Carrito",
        2: "Aceptada",
        3: "Enviada",
        4: "Recibida",
        5: "Rechazada",
        6: "Cancelada",
        7: "Pendiente de aprobación",
    }
    return (
        <>
            <div className='orderDetail__address'>
                <h2 className='orderDetail__address--title'>Direccion de Envío y detalles</h2>
                {addressStreet &&
                    <div className='orderDetail__address--address'>
                        {user && <p className='orderDetail__address--userName'> <span> Usuario:</span> {user[0]?.userFirstName}, {user[0]?.userEmail}</p>}
                        <p className='bold'>Direccion:</p>
                        <p><span > Calle:</span> {addressStreet}, {addressNumber}.</p>
                        <p><span>Departamento:</span> {addressFlat}.</p>
                        <p><span>Piso:</span> {addressFloor}.</p>
                        <p><span>Provincia:</span> {addressProvince}.</p>
                        <p><span>Ciudad:</span> {addressCity}, {addressZipCode}.</p>
                        <p><span>Descripción:</span> {addressComment}.</p>
                    </div>}
            </div>

            <div className='orderDetail__cart'>
                <h2 className='orderDetail__cart--title'>Detalle de la compra:</h2>
                <div className='orderDetail__cart--bougth'>
                    <p><span>Total:</span> ${orderTotal?.toLocaleString("de-DE")}</p>
                    <p className='cart'><span>Carrito:</span> </p>
                    {cart && cart.map(item => {
                        let exist = reviews.find(e => e.productId == item.productId)
                        return <div key={item.productId} className="orderDetail__cart--item">
                            <p>
                                {item.productName}
                            </p>
                            <p>
                                X
                            </p>
                            <p>
                                {item.productCant}
                            </p>
                            {(orderState == 4 && !exist) && <Link className='Link' to={`/review/${orderId}/${item.productId}/${userId}`} disabled={exist}>Deja tu review</Link>}
                        </div>
                    })}
                    <p> <span> Estado:</span> {orderPosibleStates[orderState]}</p>
                </div>
            </div>

        </>
    )
}

export default OrderDetail