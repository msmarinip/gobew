import { Field, Form, Formik } from 'formik'
import React from 'react'
import TextInput from './TextInput'
import * as Yup from 'yup';
import { POST_USER_ADDRESS } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const OrderForm = ({ userId, }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { orderId } = useSelector(state => state.clientReducer)

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                userId,
                addressStreet: '',
                addressNumber: '',
                addressFloor: '',
                addressFlat: '',
                addressCity: '',
                addressZipCode: '',
                addressProvince: '',
                addressComment: '',
                addressIsShipping: true,
                addressIsBilling: true
            }}
            onSubmit={(values) => {
                try {
                    dispatch(POST_USER_ADDRESS({ values, userId, orderId }))
                    navigate('/checkout')
                } catch (error) {
                    alert("Se produjo un error al cargar la dirección, intente nuevamente")
                }
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

                        <TextInput label='Nombre' name='addressProvince' type='text' placeholder='Provincia *' />
                        <TextInput label='Precio' name='addressCity' type='text' placeholder='Ciudad *' />
                        <TextInput label='Stock' name='addressZipCode' type='number' placeholder='Código postal' />
                        <TextInput label='Stock' name='addressStreet' type='text' placeholder='Calle *' />
                        <TextInput label='Stock' name='addressNumber' type='number' placeholder='Numero *' />
                        <TextInput label='Stock' name='addressFloor' type='number' placeholder='Piso *' />
                        <TextInput label='Stock' name='addressFlat' type='text' placeholder='Departamento *' />
                        <Field as="textarea" name="addressComment" label='Descripción' class="textArea" placeholder='Descripción de envío' />
                        <button className=''> AGREGAR NUEVA DIRECCIÓN</button>
                    </Form >
                )
            }
        </Formik >
    )
}

export default OrderForm


//id de order satado 1 y shipping addres