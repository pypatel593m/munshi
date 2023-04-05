import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import { CheckLogin } from '../util';

const ProtectedRoute = () => {
    
 return (
    CheckLogin() ? <Outlet/> : <Navigate to="/login" />
 )

};

export default ProtectedRoute;