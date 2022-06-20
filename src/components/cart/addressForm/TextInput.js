import React from 'react'
import { useField, ErrorMessage } from 'formik'

const TextInput = (props) => {
    const [field] = useField(props);
    return (
        <>
            <input {...field}  {...props} />
            <ErrorMessage name={props.name} component='span' className='errorMessage' />
        </>)
}

export default TextInput