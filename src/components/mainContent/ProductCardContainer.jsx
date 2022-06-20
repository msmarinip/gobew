import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHECK_LOGIN, GET_PRODUCTS, GET_USER_CART, SEARCH_BY_ID, SET_CART, SET_TOTAL } from '../../redux/actions';
import ProductsMap from './ProductsMap';

export default function ProductCardContainer() {

    const { products, isFiltered, cart, userId } = useSelector((store) => store.clientReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isFiltered) {
            dispatch(GET_PRODUCTS())
        }
    }, [dispatch])
    
    useEffect(() => {
        dispatch(SEARCH_BY_ID(userId))
}, []);

    return (
        <section className='products' >
            {products.length > 0 ?
                <ProductsMap products={products} /> :
                <p className='products__noProducts'>
                    No hay productos asociados
                </p>
            }
        </section>
    )
}

