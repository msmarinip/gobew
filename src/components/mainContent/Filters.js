import React, { useState } from 'react'
import CategoriesContainer from '../nav/categories/CategoriesContainer'
import OrderinContainer from '../nav/ordering/OrderinContainer'
import SearchBar from '../nav/SearchBar'
import { Link } from 'react-router-dom'


const Filters = () => {
    const [priceActive, setPriceActive] = useState(false)
    const [alphabeticalActive, setAlphabeticalActive] = useState(false)


    const handleReset = () => {
        //reset prev button
        setAlphabeticalActive(false)
        setPriceActive(false)

    }
    return (
        <aside className='filters'>
            <SearchBar />
            <OrderinContainer priceActive={priceActive} alphabeticalActive={alphabeticalActive} setPriceActive={setPriceActive} setAlphabeticalActive={setAlphabeticalActive} />
            <CategoriesContainer handleReset={handleReset} />
            <div className='filters--faqs'>
                <Link to='/faqs'>Faqs</Link>
            </div>
        </aside>
    )
}

export default Filters