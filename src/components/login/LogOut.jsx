import react, {useState} from "react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { LOG_OUT, SEARCH_BY_ID } from "../../redux/actions";

export default function LogOut({ userId,User}) {
    const {userAllInfo , userFirstName} = useSelector(store => store.clientReducer);
    const dispatch = useDispatch();
    const [clickUser, setClickUser] = useState(false)
    const handleClick = () => {
        setClickUser(!clickUser)
    }
    const handleLogOut = () => {
        dispatch(LOG_OUT())
    }
    // useEffect(() => {
    //     if (userId){
    //         dispatch(SEARCH_BY_ID(userId))
    //     }
    // }, []);
    return (
        <div className="nav__loginCart--login" onClick={(e) => handleClick()}>
            <img className='nav__loginCart--login-img' src={User} alt='img not found' />
            <p className='nav__loginCart--login-text'>{userFirstName}</p>
            {<div className={clickUser ? "nav__loginCart--login-render" : "nav__loginCart--login-hidden"}>
                <div >
                    <Link to="/profile" className="nav__loginCart--login-profile">Perfil</Link>
                    <Link to="/wishList" className='nav__loginCart--login-fav'>Favoritos</Link >
                    <p onClick={(e) => handleLogOut()} className="nav__loginCart--login-logout">Cerrar Sesión</p>
                </div>
            </div>}
        </div>
    )
}