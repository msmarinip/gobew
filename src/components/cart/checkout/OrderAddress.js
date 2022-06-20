import React from 'react'

const OrderAddress = ({ addressStreet, addressNumber, addressFloor, addressCity, addressFlat, addressProvince, addressZipCode }) => {
    return (
        <div className='orderAddress' >
            <p>Dirección de envío:  </p>
            <p>Provincia: {addressProvince}</p>
            <p>Ciudad: {addressCity}</p>
            <p>Dirección: {addressStreet} {addressNumber}</p>
            <p>Piso: {addressFloor}</p>
            <p>Departamento: {addressFlat}</p>
            <p>Código Postal: {addressZipCode}</p>
        </div >
    )
}

export default OrderAddress