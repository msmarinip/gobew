import { Field, Form, Formik } from 'formik'
import React from 'react'
import { TextInput } from '../form/TextInput';
import * as Yup from 'yup';
import { CHANGE_DIRECTION, CHECK_LOGIN, SEARCH_BY_ID, SEARCH_DIRECTION_BY_ID } from "../../redux/actions"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function EditDirecProfile() {
    const dispatch = useDispatch();
    const { direcId } = useParams();
    const navigate = useNavigate();
    const [check, setcheck] = useState(false)
    const [ok, setOk] = useState({
        ok: '',
        msg: ''
      })
    //   console.log(direcId)
    let direcActual = []
    const { userId, userAllInfo, userDirection, userResponse } = useSelector(store => store.clientReducer);
    // console.log(userAllInfo)
    userDirection?.addresses?.forEach(element => {
        if (element._id === direcId) {
            direcActual = element
        }
    });
    if (userResponse.ok && check) {
        // toast.success("Se ha cambiado tu direccion con exito")
        alert("Se ha cambiado la direccion con exito")
        navigate("/")
    } 
    // else if (!userResponse.ok && check){
    //     setOk({ok: false, msg: 'Usuario no encontrado'})
    // }
    useEffect(() => {
        dispatch(CHECK_LOGIN())
        // dispatch(SEARCH_DIRECTION_BY_ID(userId))
        dispatch(SEARCH_BY_ID(userId))
    }, [])

    console.log(direcActual)
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                userId,
                addressStreet: direcActual.addressStreet,
                addressNumber: direcActual.addressNumber,
                addressFloor: direcActual.addressFloor,
                addressFlat: direcActual.addressFlat,
                addressCity: direcActual.addressCity,
                addressZipCode: direcActual.addressZipCode,
                addressProvince: direcActual.addressProvince,
                addressComment: direcActual.addressComment,
                addressIsShipping: direcActual.addressIsShipping,
                addressIsBilling: direcActual.addressIsBilling
            }}
            onSubmit={(values) => {
                // addressComment,addressStreet, addressNumber, 
                // addressFloor, addressFlat, addressCity, addressZipCode, addressProvince
                console.log(values)
                const objUser = {
                    userId,
                    addressStreet: values.addressStreet,
                    addressNumber: values.addressNumber,
                    addressFloor: values.addressFloor,
                    addressFlat: values.addressFlat,
                    addressCity: values.addressCity,
                    addressZipCode: values.addressZipCode,
                    addressProvince: values.addressProvince,
                    addressComment: values.addressComment,
                    addressId: direcId,
                }
                dispatch(CHANGE_DIRECTION(objUser))
                setcheck(true)
                // navigate('/checkout')
            }}
            validationSchema={Yup.object().shape({
                addressProvince: Yup.string().required("La provincia es requerida"),
                addressCity: Yup.string().required("La ciudad es requerida"),
                addressStreet: Yup.string().required("La dirección es requerida"),
                addressNumber: Yup.number().required("El número es requerido"),
                addressFloor: Yup.string().required("El piso es requerido"),
                addressFlat: Yup.string().required("El depto es requerido"),
                addressZipCode: Yup.number().required("El código postal es requerido"),
                addressComment: Yup.string(),
                addressIsShipping: Yup.boolean(),
                addressIsBilling: Yup.boolean()
            })}
        >
            {
                (formik) => (
                    <Form className='newAddressForm'>
                        <p>Añade una nueva dirección</p>

                        <TextInput label='Provincia*' name='addressProvince' type='text' placeholder='Provincia *' />
                        <TextInput label='Ciudad *' name='addressCity' type='text' placeholder='Ciudad *' />
                        <TextInput label='Código postal*' name='addressZipCode' type='number' placeholder='Código postal' />
                        <TextInput label='Calle *' name='addressStreet' type='text' placeholder='Calle *' />
                        <TextInput label='Numero *' name='addressNumber' type='number' placeholder='Numero *' />
                        <TextInput label='Piso *' name='addressFloor' type='number' placeholder='Piso *' />
                        <TextInput label='Departamento *' name='addressFlat' type='text' placeholder='Departamento *' />
                        <Field as="textarea" name="addressComment" label='Descripción' class="textArea" placeholder='Descripción de envío' />
                        <button className='' type='submit'> AGREGAR NUEVA DIRECCIÓN</button>
                        {ok.ok === false && <p> {ok.msg} </p>}
                    </Form >
                )
            }
        </Formik >
    )
}