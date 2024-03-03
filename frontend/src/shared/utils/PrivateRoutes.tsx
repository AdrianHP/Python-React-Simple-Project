import { Navigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContex';

function PrivateRoute  ({children, ...rest}) {
    let { user } = useContext(AuthContext)

    return !user ? <Navigate to='/login'/> : children;
}

export default PrivateRoute;