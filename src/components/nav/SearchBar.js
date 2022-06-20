import React from 'react'
import { useDispatch } from 'react-redux'
import { GET_PRODUCTS, SEARCH_PRODUCT } from '../../redux/actions'
// import styles from '../styles/nav.module.css'

const SearchBar = () => {
    const dispatch = useDispatch()
    const handleChanges = (e) => {
        if (e.target.value === "") {
            dispatch(GET_PRODUCTS())
            return
        }
        dispatch(SEARCH_PRODUCT(e.target.value))
    }
    return (
        <>
            <input className="searchBar" type="text" onChange={handleChanges} placeholder="¿Qué estás buscando hoy?" />
        </>
    )
}

export default SearchBar