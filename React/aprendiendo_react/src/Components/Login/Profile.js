import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./Logout"; 

export const Profile = () => {
    const {user,isAuthenticated,isLoading} = useAuth0();
    if(isLoading){
        return <div> Cargando...</div>;
    }
    else
    return(
        isAuthenticated && (
        <div>
                <img src={user.picture} alt={user.name}/>
                <p>{user.name}</p>
                <p>Email:{user.email}</p>
                <p>{user.profile}</p>
                

        </div>
        )
    );

}