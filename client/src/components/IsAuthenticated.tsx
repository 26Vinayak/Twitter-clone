import React from 'react'
import {gql,useQuery} from '@apollo/client';
import { Redirect } from 'react-router-dom';


const IS_LOGGED_IN = gql`
    query IS_LOGGED_IN{
        me{
            id
        }
    }
`;
interface Props{
    children?: React.ReactNode
}

function IsAuthenticated({ children }: Props) {
    const {loading,error,data} = useQuery(IS_LOGGED_IN);
    
    if(loading){
        return <p>Loading</p>
    }
    if(error){
        return <p>{error.message}</p>
    }
    if(!data.me){
        return <Redirect to={{pathname:'/landing'}}/>
    }
    return <>children</>;
}

export default IsAuthenticated;
