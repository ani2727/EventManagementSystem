import React from "react";
import getUserInfo from "../../utils/userInfo";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userData = getUserInfo();

    return children;
    if(userData.isSuperAdmin) return children;
    
    else return children;
}

export default ProtectedRoute;
