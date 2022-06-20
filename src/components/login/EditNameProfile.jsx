import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CHANGE_NAME, CHECK_LOGIN, SEARCH_BY_ID } from "../../redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { TextInput } from '../form/TextInput';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { toast } from 'react-toastify';

export default function EditNameProfile (){
  const navigate = useNavigate();
    const {userId} = useParams();
    const dispatch = useDispatch();
    const {userAllInfo, userResponse } = useSelector(store => store.clientReducer);
    const [ok, setOk] = useState({
      ok: '',
      msg: ''
    })
    const [check,setcheck] = useState(false)

    // const changeName = async (userFirstName,userLastName) => {
    //   try {
    //     const objUser = {
    //       userId,
    //       userFirstName,
    //       userLastName
    //     }
    //     console.log(objUser)
    //     const res = await axios.put(`${REACT_APP_APIURL}users/`,objUser);
    //     const data = res.data
    //     if(data.ok){
    //       alert("Su nombre fue modificado con exito")
    //     } else {
    //       setOk({ok: false, msg: 'Usuario no encontrado'})
    //     }
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }

    useEffect (()=>{
    dispatch(CHECK_LOGIN())
    dispatch(SEARCH_BY_ID(userId))
    },[])
    if (check && userResponse) {
      // SI PONES TOAST SUCCES LUGO AL SER DIRIGIDO A LA LANDING PERDES EL NOMBRE ACTUALIZADO, CON ALERT NO
      // toast.success("Se ha cambiado tu nombre con exito")
      alert("Se ha cambiado tu nombre con exito")
      navigate("/")
    }

    return (
        <div className="loginForm">
        <h1 className='loginForm__title'> Cambiar Nombre</h1>
        <Formik
          style={{ height: "2000vh" }}
          initialValues={{
            userFirstName: userAllInfo?.userFirstName,
            userLastName: userAllInfo?.userLastName,
          }}
          validationSchema={Yup.object({
            userFirstName: Yup.string()
              .matches(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, "El nombre debe contener solo letras")
              .min(2, 'El nombre es muy corto!')
              .max(50, 'El nombre es muy largo!')
              .required("Requerido."),
            userLastName: Yup.string()
              .matches(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, "El apellido debe contener solo letras")
              .min(2, 'El apellido es muy corto!')
              .max(50, 'El apellido es muy largo!')
              .required("Requerido.")
          })
          }
          onSubmit={(values, actions) => {
            // changeName(values.userFirstName,values.userLastName)
            const objUser = {
                    userId,
                    userFirstName: values.userFirstName,
                    userLastName: values.userLastName
                  }
            dispatch(CHANGE_NAME(objUser))
            setcheck (true)

          }}
        >
          {props => (
            <Form className='loginForm--container'>
              <TextInput label="Nombre" name="userFirstName" type="nombre" placeholder="nombre" />
              <TextInput label="Apellido" name="userLastName" type="apellido" placeholder="apellido" />
              <button type="submit" className='createUser__btn'>Continuar</button>
              {ok.ok === false && <p> {ok.msg} </p>}
  
            </Form>
          )}
  
        </Formik>
      </div>
)
}