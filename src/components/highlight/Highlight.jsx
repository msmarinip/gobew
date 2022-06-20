import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GET_HIGHLIGHTED } from "../../redux/actions"
import HighlightCard from "./HighlightCard"
import { useState } from "react"
import { TiArrowRightThick } from 'react-icons/ti'
import '../../scss/mainContent/_highLight.scss'

export default function Highlight() {

    let dispatch = useDispatch()
    let highlightProd = useSelector((state) => state.clientReducer.productHighlight)

    let res = highlightProd.productList

    //!PAGINATION 
    const [currentHigh, setCurrentHigh] = useState(res);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const itemPerPage = 3;

    function handleClickDer() {
        if (currPage === pageCount - 1) {
            setCurrPage(0)
            const offset = currPage * itemPerPage;
            setItemOffset(offset);
            const endOffset = itemOffset + itemPerPage;
            setCurrentHigh(res?.slice(itemOffset, endOffset));
        } else {
            setCurrPage(currPage + 1)
            const offset = currPage * itemPerPage;
            setItemOffset(offset);
            const endOffset = itemOffset + itemPerPage;
            setCurrentHigh(res?.slice(itemOffset, endOffset));
        }
    }

    useEffect(() => {
        const endOffset = itemOffset + itemPerPage;
        setCurrentHigh(res?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(res?.length / itemPerPage));
    }, [res, itemOffset, itemPerPage]);

    useEffect(() => {
        dispatch(GET_HIGHLIGHTED())
    }, [dispatch])

    return (
        <div className="highlight--content__container">
            <h2>Nuestros Productos Destacados</h2>
            <div className="highlight--prods__container">
                {
                    currentHigh?.map(elem => {
                        return <HighlightCard key={elem._id} _id={elem._id} images={elem?.images[0].imageName} productPrice={elem.productPrice} />
                    })
                }

                <button className="react--paginate__der" onClick={handleClickDer}>
                    <TiArrowRightThick size={40} />
                </button>
            </div>

        </div>
    )
}