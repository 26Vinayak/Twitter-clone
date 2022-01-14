import React from 'react'
import {gql,useQuery} from '@apollo/client';


const USERS_QUERY = gql`
    query USERS_QUERY{
        users{
            id
            name
        }
    }
`;

interface User{
    name:string
};

function Users() {
    const {loading,error,data} = useQuery(USERS_QUERY);
    
    if(loading){
        return <p>Loading</p>
    }
    if(error){
        return <p>{error.message}</p>
    }
    console.log(data);
    
    return (
        <div>
            <h1>Vinayak</h1>
            {data.users.map((user:User) =>{
                return <p>{user.name}</p>
            })}
        </div>
    )
}

export default Users
