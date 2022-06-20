import { Form, Formik } from 'formik';
import { TextInput } from '../form/TextInput';
import * as Yup from 'yup';
import axios from "axios";
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
const { REACT_APP_APIURL } = process.env;

export const ChangePassword = () => {
  const { userId, hash, userEmail } = useParams();
  const [ok, setOk] = useState({
    ok: '',
    msg: ''
  })

  const navigate = useNavigate();
//   const checkPass = async () => {
//     try {
//       const response = await axios.get(`${REACT_APP_APIURL}users/checkResetPass/${userId}/${hash}/${userEmail}`);
      
//       if(response.data.ok){
//         setOk({ok:true, msg:response.data.msg})
//       } else {
//         setOk({ok: false, msg:response.data.msg})
//       }

//     } catch (error) {
      
//       setOk({ok: false, msg:'Ha ocurrido un error, por favor intente nuevamente.'})
        
//     }
//   }

  const cbCheckPass = useCallback( async () => {
    try {console.log('entro')
        const response = await axios.get(`${REACT_APP_APIURL}users/checkResetPass/${userId}/${hash}/${userEmail}`);
        
        if(response.data.ok){
          setOk({ok:true, msg:response.data.msg})
        } else {
          setOk({ok: false, msg:response.data.msg})
        }
  
      } catch (error) {
        
        setOk({ok: false, msg:'Ha ocurrido un error, por favor intente nuevamente.'})
          
      }
  }, [userId, hash, userEmail]);


  const changePassword = async (userPassword) => {
    try {
        const objUser = {
            userId,
            userEmail,
            userPassword
        }
        const response =  await axios.put(`${REACT_APP_APIURL}users/changePass`, objUser);
        const data = response.data;
        console.log(data)
        
        if(data.ok){
            if(data.user.userIsActive)
            {    sessionStorage.setItem('userFirstName', data.userfirstName);
                sessionStorage.setItem('userId', data.userId);
                sessionStorage.setItem('userIsAdmin', data.userIsAdmin);
                sessionStorage.setItem('userIsSuperAdmin', data.userIsSuperAdmin);
                toast.success('La password fue modificada')
                return navigate('/login', {replace: true})
            }
        } else {
          setOk({ok: false, msg: 'Usuario no encontrado'})
        }      
    } catch (error) {
        setOk({ok: false, msg: 'Ha ocurrido un error, por favor intente nuevamente.'})
    }
  }

  useEffect(() => {
    cbCheckPass();
  },[cbCheckPass])
  
  return (

  <div >
    {ok.ok === false && <span>{ok.msg} </span>}
    { ok.ok && 
    <Formik
      //  enableReinitialize={true}
      initialValues={{ userPassword:'', userPasswordConfirm:'' }}
      validationSchema={Yup.object({
        userPassword: Yup.string().min(6, 'Requerida').required('Required'),
        userPasswordConfirm: Yup.string().min(6, 'Requerida')
            .required('Required')
            .oneOf([Yup.ref('userPassword')], 'La contraseña y su confirmación deben coincidir.')
        })
    }
    onSubmit={(values, actions) => {
      
      console.log(1, values)
      changePassword(values.userPassword)
    }}
    
    >
      {props => (
        <section >
          <Form >
            <div >
              <h1>CAMBIAR CONTRASEÑA</h1>
            </div>
            <div >
              <TextInput name='userPassword' type='password' placeholder='Constraseña'/>
            </div>
            <div >
              <TextInput name='userPasswordConfirm' type='password' placeholder='Confirmar constraseña'/>
            </div>
            <div >
              <button type="submit">Enviar</button>
            </div>

            
          </Form>
        </section>
      )}
    </Formik>
    }
  </div>
)};
