import React from 'react'
import {gql,useMutation} from '@apollo/client';
import { ErrorMessage, Field ,Form , Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
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
        <div className="container">
            <img 
                src="https://i.gadgets360cdn.com/large/Koo_details_small_1612960002135.jpg" 
                alt=""
                style={{width:"100px"}}
                className="logo"
            />
            <h3>Login to App</h3>
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
                    <button type="submit" className="login-button"><span>Log in</span></button>
                </Form>
            </Formik>
            <div className="register">
                <h4>Don't have an account</h4>
                <Link to ="signup">Sign up</Link>
            </div>
        </div>
    );
}
export default Login
