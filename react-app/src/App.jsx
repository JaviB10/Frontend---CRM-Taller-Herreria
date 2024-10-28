import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthChecker } from './contexts/AuthChecker';
import { PrivateRoute } from './routes/PrivateRoute';
import { ClientProvider } from './contexts/ClientContext';
import { Home, Login, Jobs, Budgets } from './pages';
import { NavBar } from './components';

function App() {

    const location = useLocation(); // Obtiene la ruta actual

    return (
        <AuthProvider>
            <ClientProvider>
                <AuthChecker />

                {location.pathname !== "/login" && <NavBar />}

                <Routes>
                    <Route 
                        path="/login" 
                        element={<Login />}
                    />
                    <Route 
                        path="/" 
                        element={<Navigate to="/home" />}
                    />
                    <Route 
                        path="/home" 
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route 
                        path="/jobs/:id" 
                        element={
                            <PrivateRoute>
                                <Jobs />
                            </PrivateRoute>
                        }
                    />  
                    <Route 
                        path="/budget/:id" 
                        element={
                            <PrivateRoute>
                                <Budgets />
                            </PrivateRoute>
                        }
                    />  
                </Routes>
            </ClientProvider>
        </AuthProvider>
    )
}

export default App
