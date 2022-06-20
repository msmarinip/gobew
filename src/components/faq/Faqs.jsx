import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GET_FAQS } from "../../redux/actions"
import FaqCard from "./FaqCard"
import '../../scss/faq/_faqs.scss'

export default function Faqs() {

    let dispatch = useDispatch()
    let faqs = useSelector((state) => state.clientReducer.faqs)

    let res = faqs.faqList
    console.log(res)

    useEffect(() => {
        dispatch(GET_FAQS())
    }, [dispatch])

    return (
        <div className="faqs--content__container">
            <h1>FAQS</h1>
            {
                res?.map(elem => {
                    return <FaqCard key={elem.faqId} faqTitle={elem.faqTitle} faqDescription={elem.faqDescription} />
                })
            }
        </div>
    )
}