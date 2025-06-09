import React from 'react';
import { Navigate } from 'react-router-dom';

type RouteGuardProps = {
  children: React.ReactNode;
  privateRoute?: boolean; // If true, the route requires authentication
};

const RouteGuard: React.FC<RouteGuardProps> = ({ children, privateRoute = false }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in

  if (privateRoute && !isLoggedIn) {
    // Redirect to login if the route is private and the user is not logged in
    return <Navigate to="/login" replace />;
  }

  if (!privateRoute && isLoggedIn) {
    // Redirect to home if the route is public and the user is logged in
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;