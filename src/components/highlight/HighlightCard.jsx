import { Link } from 'react-router-dom'
import '../../scss/mainContent/_highLight.scss'
const { REACT_APP_CLOUDINARY_RES } = process.env

export default function HighlightCard({ _id, images, productPrice }) {

    return (
        <div className='highlight--card'>
            <Link to={`/productDetail/${_id}`}>
                <img src={REACT_APP_CLOUDINARY_RES + images} alt="" />
                <p>{"$" + productPrice?.toLocaleString('de-DE')}</p>
            </Link>
        </div>
    )
}