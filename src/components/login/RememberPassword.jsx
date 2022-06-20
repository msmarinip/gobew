import { Form, Formik } from 'formik';
import { TextInput } from '../form/TextInput';
import * as Yup from 'yup';
import axios from "axios";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHECK_GOOGLE_MAIL } from '../../redux/actions';
const { REACT_APP_APIURL } = process.env;
import { toast } from 'react-toastify';

export const RememberPassword = () => {
  const { userResponse } = useSelector(store => store.clientReducer);
  const dispatch = useDispatch();
  const [ok, setOk] = useState('')
  const [info, setInfo] = useState("")
  const [check, setcheck] = useState(false);
  let usuarioDeGoogle = ""
  // let info = ""

  const sendMailResetPass = async (values) => {
    try {
      console.log(`${REACT_APP_APIURL}users/resetPass`)
      console.log(values)
      const response = await axios.post(`${REACT_APP_APIURL}users/resetPass`, values);
      console.log(response)
      if(response.data.ok){
        setOk(response.data.msg)
      } else {
        setOk(response.data.msg)
      }

    } catch (error) {
      console.log(error)
        setOk('Ha ocurrido un error, por favor intente nuevamente.')
    }
  }
  if(check && userResponse.ok && userResponse.userIsGoogle){
    usuarioDeGoogle="Usted creo su usuario con google, no puede cambiar su contraseña"
    console.log("hola")
    
  } else if (check && userResponse.ok && !userResponse.userIsGoogle){
    sendMailResetPass(info)
    console.log(info)
    toast.success("Mail enviado")
    setcheck(false)
  }
  return (

  <div >
    <span>{ ok }</span>
    <Formik
      initialValues={{ userEmail:'' }}
      validationSchema={Yup.object({
        userEmail: Yup.string()
          .email('Debes ingresar un email válido')
          .required('Debes ingresar tu email para reestablecer la contraseña')
        })
    }
    onSubmit={(values, actions) => {
      dispatch(CHECK_GOOGLE_MAIL(values.userEmail))
      setcheck(true)
       setInfo(values)
      // sendMailResetPass(values)
      
    }}
    
    >
      {props => (
        <section >
          <Form >
            <div >
              <h1>REESTABLECER CONTRASEÑA</h1>
            </div>
            <div >
              <TextInput name='userEmail' type='email' placeholder='e-mail'/>
            </div>
            <div>
              <button type="submit">Enviar</button>
              {usuarioDeGoogle && <p>{usuarioDeGoogle} </p>}
            </div>

            
          </Form>
        </section>
      )}
    </Formik>
    
  </div>
)};