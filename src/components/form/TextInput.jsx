import { useField, ErrorMessage } from 'formik'

//Text input type puede ser text, email, password o number
export const TextInput = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      {/* <label htmlFor={ props.id || props.name }>{ label }</label> */}
      <input {...field}  {...props} placeholder={label} />
      <ErrorMessage name={props.name} component='span' />
    </>
  )
}
