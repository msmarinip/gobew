import React from 'react'
import ProductCard from './ProductCard'

export default function ProductsMap({ products }) {
    console.log(products);
    return (
        <>
            {
                products?.map((prod) => prod.productIsActive && prod.productStock > 0 && <ProductCard key={prod._id} {...prod} product={prod} />)
            }
        </>
    )
}
