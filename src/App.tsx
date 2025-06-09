import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './components/layouts/MainLayout';
import UnAuthLayout from './components/layouts/UnAuthLayout';
import RouteGuard from './routes/guards/RouteGuard';
import { ThemeProvider } from './provider/ThemeContext';
import { allRoutes } from './routes';
import type { RoutesConfig } from './shared/interfaces';
import NotFoundPage from './UI/components/not-found';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          {allRoutes.map((route: RoutesConfig) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <RouteGuard privateRoute={route.private}>
                    {route.private ? (
                      <MainLayout>{route.page ? <route.page /> : null}</MainLayout>
                    ) : route.page ? (
                      <UnAuthLayout>
                        <route.page />
                      </UnAuthLayout>
                    ) : null}
                  </RouteGuard>
                }
              />
            );
          })}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
