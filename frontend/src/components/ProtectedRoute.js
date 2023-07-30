import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

export const ProtectedRoute = ({ element: Component, ...props }) => {
  const appContext = useContext(AppContext);
  if (appContext.isLoading) {
    return (
        <div className='sign-in-up'><h2 className="sign-in-up__header">Загрузка...</h2></div>
    );
  }

  return appContext.loggedIn ? <Component {...props} /> : <Navigate to='/sign-in' replace />
}