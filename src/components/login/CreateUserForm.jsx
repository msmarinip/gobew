import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { TextInput } from '../form/TextInput';
import * as Yup from 'yup';
import { CREATION_USERFORM } from '../../redux/actions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CreateUserForm() {
  let erroresMail = false
  let contraseñaInsegura = false
  const back = useNavigate();
  const dispatch = useDispatch();
  const { userResponse } = useSelector(store => store.clientReducer)
  if (userResponse.msg && userResponse.msg.hasOwnProperty("userEmail")){
    erroresMail = true
  } else if (userResponse.msg && userResponse.msg.hasOwnProperty("userPassword")){
    contraseñaInsegura = true
  } else if(userResponse.msg=== "ok" && userResponse.ok){
    toast.success("Usuario creado con exito")
    back("/logIn")
  }
  return (
    <div className="loginForm">
      <h1 className='loginForm__title'> Crear Usuario</h1>
      <Formik
        style={{ height: "2000vh" }}
        initialValues={{
          userEmail: '',
          userPassword: '',
          userFirstName: "",
          userLastName: "",
        }}
        validationSchema={Yup.object({
          userEmail: Yup.string()
            .email('El email es inválido.')
            .required('Requerido.'),
          userPassword: Yup.string()
          .min(6, 'La contraseña debe tener al menos 6 caracteres')
          .required("Requerido"),
          userFirstName: Yup.string()
            .matches(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, "El nombre debe contener letras")
            .min(2, 'El nombre es muy corto!')
            .max(50, 'El nombre es muy largo!')
            .required("Requerido."),
          userLastName: Yup.string()
            .matches(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/, "El apellido debe contener letras")
            .min(2, 'El apellido es muy corto!')
            .max(50, 'El apellido es muy largo!')
            .required("Requerido.")
        })
        }
        onSubmit={(values, actions) => {
          dispatch(CREATION_USERFORM(values))
        }}
      >
        {props => (
          <Form className='loginForm--container'>
            <TextInput label='E-mail' name='userEmail' type='email' placeholder='e-mail' />
            <TextInput label='Contraseña' name='userPassword' type='password' placeholder='password' />
            <TextInput label="Nombre" name="userFirstName" type="nombre" placeholder="nombre" />
            <TextInput label="Apellido" name="userLastName" type="apellido" placeholder="apellido" />
            <button type="submit" className='createUser__btn'>Continuar</button>
            {erroresMail && <p> {userResponse.msg.userEmail.msg} </p>}
            {contraseñaInsegura && <p>{userResponse.msg.userPassword.msg}</p>}



          </Form>
        )}

      </Formik>
    </div>
  )
}
