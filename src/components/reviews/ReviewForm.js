import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsFillStarFill } from 'react-icons/bs';
import { useState } from 'react';
const { REACT_APP_APIURL } = process.env

const ReviewForm = ({ orderId, productId, userId }) => {
    const navigate = useNavigate()


    const [values, setValues] = useState({
        reviewStars: 0,
        reviewComment: '',
        orderId,
        productId,
        userId
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        if (values.reviewStars == 0 || values.reviewComment == '') {
            toast.error('Todos los campos son obligatorios')
            return
        } else if (values.reviewStars > 5 || values.reviewStars < 1) {
            toast.error('Las estrellas deben estar entre 1 y 5')
            return
        }
        fetch(`${REACT_APP_APIURL}reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error)
                } else {
                    toast.success('Reseña agregada')
                    navigate(`/order/${orderId}`)
                }
            }).catch(err => err)
    }
    return (

        <form className='newReviewForm' action="" onSubmit={handleSubmit} onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}>
            <h1>Deja tu reseña:</h1>
            <div>
                <label htmlFor="reviewStars1">
                    <BsFillStarFill className={values.reviewStars >= 1 ? "stars Selected" : "stars"} />
                    <input id="reviewStars1" type="radio" name='reviewStars' value={1} />
                </label>


                <label htmlFor="reviewStars2">
                    <BsFillStarFill className={values.reviewStars >= 2 ? "stars Selected" : "stars"} />
                    <input id="reviewStars2" type="radio" name='reviewStars' value={2} />
                </label>


                <label htmlFor="reviewStars3">
                    <BsFillStarFill className={values.reviewStars >= 3 ? "stars Selected" : "stars"} />
                    <input id="reviewStars3" type="radio" name='reviewStars' value={3} />
                </label>


                <label htmlFor="reviewStars4">
                    <BsFillStarFill className={values.reviewStars >= 4 ? "stars Selected" : "stars"} />
                    <input id="reviewStars4" type="radio" name='reviewStars' value={4} />
                </label>


                <label htmlFor="reviewStars5">
                    <BsFillStarFill className={values.reviewStars >= 5 ? "stars Selected" : "stars"} />
                    <input id="reviewStars5" type="radio" name='reviewStars' value={5} />
                </label>
            </div>


            <textarea id="reviewComment" cols="30" rows="10" name="reviewComment"
                onChange={(e) => setValues({ ...values, [e.target.id]: e.target.value })} placeholder="Tu Reseña aqui..."></textarea>

            <button type="submit" className=''>Enviar Reseña</button>
        </form>
    )
}

export default ReviewForm