import React from "react";
import getUserInfo from "../../utils/userInfo";
import { Navigate } from 'react-router-dom';

const userData = getUserInfo();

export const ProtectedRoute = ({ children }) => {

    
    if (!userData) {
        return <Navigate to="/signin" />;
    } else {
        return children;
    }
}

export const ProtectedClubs = ({children}) =>
{
    if(userData && userData.isSuperAdmin) return children;

    else return <Navigate to="/"/>   
}
