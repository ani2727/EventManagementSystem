import React from "react";
import getUserInfo from "../../utils/userInfo";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userData = getUserInfo();

    if (userData) {
        return children; 
    } 
    else {
        return <Navigate to="/signin" />;
    }
}

export default ProtectedRoute;
