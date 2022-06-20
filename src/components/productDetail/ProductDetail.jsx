import React, { useEffect, useState } from 'react'
import ProductAdd from '../cart/ProductAdd'
import { AiFillStar } from 'react-icons/ai'
import WishListToggle from '../wishlist/WishListToggle'
const { REACT_APP_CLOUDINARY_RES } = process.env
let StarRanges = [5, 4, 3, 2, 1]
export default function ProductDetail({ product, reviews }) {
    const [mapedReviews, setMapedReviews] = useState(reviews)
    const [selected, setSelected] = useState("all")
    useEffect(() => {
        setMapedReviews(reviews)
    }, [reviews])

    return (
        <div className="productDetail">
            <div className='productDetail__details' >
                <WishListToggle _id={product[0]?._id} />
                {product && product?.length > 0 && product[0].images.length > 0 && < img src={REACT_APP_CLOUDINARY_RES + product[0]?.images[0].imageName} alt={product[0]?.imageAlt} className="productDetail--img" />}
                <div className="productDetail--container">
                    <h2 className="productDetail__productName">{product[0]?.productName}  </h2>
                    <p className="">{product[0]?.productDescription}</p>
                    <p className="">${product[0]?.productPrice.toLocaleString('de-DE')}</p>
                    <div className='productDetail--container-btn'>
                        <ProductAdd price={product[0]?.productPrice} stock={product[0]?.productPrice} product={product[0]} />

                    </div>
                </div>
                {reviews?.length > 0 && < div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center" }}>
                    {reviews && (reviews?.reduce((a, b) => {
                        return (a + b.reviewStars)
                    }, 0) / (reviews && reviews.length)).toFixed(2)}
                    <AiFillStar className='' style={{ color: "#17252a" }} />
                </div>}
            </div>
            {/* //!REVIEWS */}
            {reviews?.length > 0 && <div className="productDetail__reviews">
                <h1 className='productDetail__reviews--title'>Reviews sobre {product[0]?.productName} </h1>
                <div className='productDetail__reviews--avg'>
                    <p className='productDetail__reviews--num'>
                        {reviews && (reviews?.reduce((a, b) => {
                            return (a + b.reviewStars)
                        }, 0) / (reviews && reviews.length)).toFixed(2)}
                    </p>
                    <AiFillStar className='productDetail__reviews--star' />
                </div>

                <div className='productDetail__reviews-stars-container'>

                    {reviews && StarRanges?.map((a) => {
                        return <div className='productDetail__reviews--stars'>
                            <progress className='productDetail__reviews--stars-bar' value={reviews?.filter(e => e.reviewStars == a).length} max={reviews ? reviews.length : 0} >
                            </progress>
                            <div>
                                <p>{a}</p>
                                <AiFillStar className='' />
                            </div>
                        </div>
                    })
                    }
                </div>
                <div className='productDetail__reviews--btns'>
                    <button id='all' className={selected == "all" && "selected"} onClick={() => { setSelected("all"); setMapedReviews(reviews) }}>
                        Todas
                    </button>
                    <button id='upper' className={selected == "upper" && "selected"} onClick={() => { setSelected("upper"); setMapedReviews(reviews.filter(e => e.reviewStars >= 4)) }}>
                        Positivas
                    </button>
                    <button id="lower" className={selected == "lower" && "selected"} onClick={() => { setSelected("lower"); setMapedReviews(reviews.filter(e => e.reviewStars <= 3)) }}>
                        Negativas
                    </button>
                </div>
                {reviews && mapedReviews?.map((review) => {
                    return <div className='productDetail__reviews--reviewTry'>
                        <p>{review.reviewComment}</p>
                        <p>{review.reviewStars} <AiFillStar className='' style={{ color: "#17252a" }} /></p>
                    </div>
                })}
            </div>}
        </div >

    )
}
