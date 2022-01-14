import React from 'react'
import {gql,useMutation} from '@apollo/client';
import { ErrorMessage, Field ,Form , Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { validate } from 'graphql';

const SIGNUP_MUTATION = gql`
    mutation signup($name:String,$email:String!, $password:String!){
        signup(name:$name, email:$email,password:$password){
            token
        }
    }
`;
interface SingupValues{
    email:string,
    password:string,
    confirmPassword:string,
    name:string,
}

function Signup() {
    const history = useHistory();
    const [signup,{data}] = useMutation(SIGNUP_MUTATION);
    console.log(data);
    
    const initialValues:SingupValues = {
        email:'',
        password:'',
        confirmPassword:'',
        name:'',
    };

    const validateSchema = Yup.object({
        email:Yup.string().email("Invalid email address").required("Email Required"),
        password: Yup.string().max(20,"Must be 20 character or less").required("Password Required"),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"),null],
            "Password must match"
        ),
        name: Yup.string().max(15,"Must be 15 characters or less").required("Name Required"),
    });

    return (
        <div className="container">
            <img 
                src="https://i.gadgets360cdn.com/large/Koo_details_small_1612960002135.jpg" 
                alt=""
                style={{width:"100px"}}
                className="logo"
            />
            <h3>Sign up into App</h3>
            <Formik 
                initialValues={initialValues} 
                validationSchema={validateSchema}
                onSubmit ={async(value, {setSubmitting})=>{
                    setSubmitting(true);
                    const response = await signup({variables:value});
                    localStorage.setItem("token",response.data.signup.token);
                    setSubmitting(false);
                    history.push('/');
            }}>
                <Form>
                    <Field name='email' type='text' placeholder='Email'/>
                    <ErrorMessage name="email" component={'div'}/>
                    <Field name='name' type='text' placeholder='Name'/>
                    <ErrorMessage name="name" component={'div'}/>
                    <Field name='password' type='password' placeholder='Password'/>
                    <ErrorMessage name="password" component={'div'}/>
                    <Field name='confirmPassword' type='password' placeholder='Confirm Password'/>
                    <ErrorMessage name="confirmPassword" component={'div'}/>
                    <button type="submit" className="login-button"><span>Sign up</span></button>
                </Form>
            </Formik>
            <div className="register">
                <h4>Already have an acoount?</h4>
                <Link to="/login">Log in</Link>
            </div>
        </div>
    )
}

export default Signup
