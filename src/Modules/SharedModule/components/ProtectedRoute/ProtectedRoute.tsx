import React from 'react'
import { useAuth } from '../../../Context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loginData } = useAuth();

  if (localStorage.getItem('token') || loginData) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
}
