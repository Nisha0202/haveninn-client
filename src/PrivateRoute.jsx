import React, { useContext } from 'react'
import { AuthContext } from './FirebaseProbider/FirbaseProvider'
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const { usern, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <p>Loading...</p>
  if (!usern) return <Navigate to='/login' state={{ from: location }} replace={true} />

  return children;
}
