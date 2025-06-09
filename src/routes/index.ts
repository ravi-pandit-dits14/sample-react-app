import { lazy } from 'react';
import type { RoutesConfig } from '../shared/interfaces';

export const allRoutes: RoutesConfig[] = [
  {
    path: '/login',
    page: lazy(() => import('../Pages/auth/Login')),
    private: false,
    roles: [],
  },
  {
    path: '/register',
    page: lazy(() => import('../Pages/auth/Register')),
    private: true,
    roles: [],
    children: [],
  },
  {
    path: '/dashboard',
    page: lazy(() => import('../Pages/features/dashboard/Dashboard')),
    private: true,
    roles: [],
  },
  {
    path: '/Users',
    page: lazy(() => import('../Pages/features/Users')),
    private: true,
    roles: [],
  },
];
