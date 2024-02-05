// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path, element: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      path={path}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/" replace />
        )
      }
    />
  );
};

export default PrivateRoute;
