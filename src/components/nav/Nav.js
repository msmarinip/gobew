import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../images/Logo-GoBew.png'
import Carrito from '../../images/carrito-compras.png'
import User from '../../images/user-icon.png'
import { Link } from 'react-router-dom'
import { CHECK_LOGIN, GET_USER_CART, GET_WISHES, SET_CART, SET_TOTAL } from '../../redux/actions';
import LogOut from '../login/LogOut';

const Nav = () => {
    const { userResponse, cart, userId, userFirstName } = useSelector(store => store.clientReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            if (userId) {
                dispatch(CHECK_LOGIN());
                dispatch(GET_USER_CART(userId))
                dispatch(GET_WISHES(userId))

            }
        } else {

            let cartStorage = localStorage.getItem('cart')
            let totalCartStorage = localStorage.getItem('totalCart')

            if (cartStorage && totalCartStorage && totalCartStorage != "undefined") {

                let cartStorageParsed = JSON.parse(cartStorage)
                let totalCartStorageParsed = JSON.parse(totalCartStorage)
                dispatch(SET_CART(cartStorageParsed))
                dispatch(SET_TOTAL(totalCartStorageParsed))
            }
        }

    }, [userId])
//     useEffect(() => {
//         if(userId){
//             dispatch(SEARCH_BY_ID(userId))
//         }
// }, []);

    return (
        <nav className='nav'>
            {/* //! LOGO */}
            <div className='nav__logo'>
                <Link to="/" className='nav__logo--link'>
                    <img className='nav__logo--img' src={Logo} alt='img not found' />
                </Link>
            </div>
            {/* //! FILTERS */}
            <div className='nav__loginCart'>
                {/* //! CART */}
                <Link className='nav__loginCart--cart' to="/cart">
                    <img className='nav__loginCart--cart-img' src={Carrito} alt='img not found' />
                    <div className='nav__loginCart--cart-circle'>
                        <p className='nav__loginCart--cart-text'>{cart?.reduce((a, b) => { return a + b.quantity }, 0)}</p>
                    </div>
                </Link>
                {/* //! LOGIN */}
                {userResponse.ok ? <LogOut id = {userId} User = {User}/>
                : <Link className='nav__loginCart--login' to={`/login`} >
                <img className='nav__loginCart--login-img' src={User} alt='img not found' />
                <p className='nav__loginCart--login-text'>Acceso</p>
            </Link>
                }
            </div>
        </nav>
    )
}

export default Nav
