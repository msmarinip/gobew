import React from 'react'
import { Link } from 'react-router-dom'
const AllOrders = ({ orders }) => {
    const orderPosibleStates = {
        0: 'Carrito de compras',
        1: "Pendiente",
        2: "Pagada",
        3: "Enviada",
        4: "Rechazada",
        5: "Rechazada",
    }
    let ordered = orders.sort(function (a, b) {
        return new Date(b.orderCreationDate) - new Date(a.orderCreationDate);
    });

    return (ordered.map((order, i) => {
        let dateCreation = new Date(order.orderCreationDate)
        let dateAcept = new Date(order.orderAceptDate)
        return <>
            <Link to={`/order/${order._id}`} className='allOrders__order' key={i}>
                <h4>
                    <span>
                        Fecha:
                    </span>
                    {" " + dateCreation.toLocaleDateString("es-ES")}
                </h4>
                <p>Total: ${order?.orderTotal.toLocaleString('de-DE')}</p>
                {order?.orderAceptDate ? <p> Aceptada el dia: {dateAcept.toLocaleDateString("es-ES")}</p> : <p> Estado: {orderPosibleStates[order.orderState]}</p>}
                {/*  {!order?.orderAceptDate && <p> Pendiente de aceptacion</p>} */}
                {order?.orderproducts?.map(p => {
                    return p.products.map(product => {
                        return <p key={product._id}>{product.productName} x{p.productCant} ${p.productPrice}</p>
                    })
                })}
            </Link>
        </>
    }))
}

export default AllOrders


// {
//     "_id": "62a1f2f34811a2251f9c7f65",
//     "orderState": 1,
//     "orderTotal": 305060,
//     "orderCreationDate": "2022-09-06T03:00:00.000Z",
//     "orderAceptDate": null,
//     "orderDeliverDate": null,
//     "orderCancelDate": null,
//     "orderproducts": [
//       {
//         "_id": "62a1f5694811a2251f9c7f94",
//         "orderId": "62a1f2f34811a2251f9c7f65",
//         "productId": "6290d9446655f25f6df9a9fa",
//      *   "productCant": 2,
//      *   "productPrice": 132529,
//        * "products": [
//           {
//             "_id": "6290d9446655f25f6df9a9fa",
//             "productName": "Combo Samsung Galaxy A22 Awesome White + Auriculares Samsung Galaxy Buds Pro"
//           }
//         ]
//       },
//       {
//         "_id": "62a1f5694811a2251f9c7f95",
//         "orderId": "62a1f2f34811a2251f9c7f65",
//         "productId": "6290d8e06655f25f6df9a9f8",
//         "productCant": 2,
//         "productPrice": 20001,
//         "products": [
//           {
//             "_id": "6290d8e06655f25f6df9a9f8",
//             "productName": "Celular ZTEA"
//           }
//         ]
//       }
//     ]
//   }