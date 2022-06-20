import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from './validate.js';
import { CHECK_LOGIN, LOG_IN_USER } from '../../redux/actions';
import { Link, useNavigate } from 'react-router-dom';
import LogInGoogle from './LogInGoogle.jsx';


const Login = () => {
    let invalido = ""
    const navigate = useNavigate()
    const { userResponse, userId } = useSelector(store => store.clientReducer)
    const [user, setUser] = useState({
        userEmail: '',
        userPassword: ''
    })
    const [errors, setErrors] = useState({});
    const [charging, setCharging] = useState(false);
    let [btnCharging, setBtnCharging] = useState(false);
    const dispatch = useDispatch()
    if (userResponse.msg === "Usuario no encontrado." || userResponse.msg === 'Password incorrecta') invalido = "invalido"

    const handleInput = async (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        invalido = false

        let objError = validate({
            ...user,
            [e.target.name]: e.target.value
        });
        setErrors(objError);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!Object.values(user).includes('') && Object.keys(errors).length === 0) {
            dispatch(LOG_IN_USER(user))
            userResponse.ok && navigate("/")
            setUser({
                email: '',
                password: ''
            })
        }
    }

    useEffect(() => {
        dispatch(CHECK_LOGIN())

    }, [])

    return (
        <form onSubmit={handleSubmit} className="loginForm">
            <div className="loginForm--container">
                <h1 className="loginForm__greatings">Hola! ingresa tus datos</h1>

                <input type="text" name='userEmail' value={user.userEmail} placeholder="Email" onChange={handleInput} className="loginForm__email" />
                <input type="password" name='userPassword' value={user.userPassword} placeholder="Contraseña" autoComplete='on' onChange={handleInput} className="loginForm__password" />

                {Object.values(errors).length > 0 && <p className="loginForm__errors">{Object.values(errors)[0]}</p>}
                <div>
                    {invalido && <p> Usuario o contraseña invalido</p>}
                    {userResponse.ok && navigate("/")}
                </div>
                <div className='loginForm__login--btn-container'>
                    <button type='submit' className="loginForm__login--btn">Ingresar</button>
                    <Link to="/logInForm" className="loginForm__singup--link"> <button className="loginForm__singup--btn" >Crear cuenta</button> </Link>
                </div>
                <LogInGoogle />
                <Link to="/rememberPass"> <div > ¿Olvido su contraseña?</div> </Link>
            </div >
        </form >
    )
}

export default Login
