import React from 'react'
import {gql,useMutation} from '@apollo/client';
import { ErrorMessage, Field ,Form , Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { validate } from 'graphql';


const LOGIN_MUTATION = gql`
    mutation login($email:String!, $password:String!){
        login(email:$email,password:$password){
            token
        }
    }
`;
interface LoginValues{
    email:string,
    password:string,
}

function Login() {
    const history = useHistory();
    const [login,{data}] = useMutation(LOGIN_MUTATION);
    console.log(data);
    
    const initialValues:LoginValues = {
        email:'',
        password:'',
    };

    const validateSchema = Yup.object({
        email:Yup.string().email("Invalid email address").required("Email Required"),
        password: Yup.string().max(20,"Must be 20 character or less").required("Password Required"),
    });

    return (
        <div>
            <h1>Login</h1>
            <Formik 
                initialValues={initialValues} 
                validationSchema={validateSchema}
                onSubmit ={async(value, {setSubmitting})=>{
                    setSubmitting(true);
                    const response = await login({variables:value});
                    localStorage.setItem("token",response.data.login.token);
                    setSubmitting(false);
                    history.push('/');
            }}>
                <Form>
                    <Field name='email' type='text' placeholder='Email'/>
                    <ErrorMessage name="email" component={'div'}/>
                    <Field name='password' type='password' placeholder='Password'/>
                    <ErrorMessage name="password" component={'div'}/>
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );
}
export default Login
