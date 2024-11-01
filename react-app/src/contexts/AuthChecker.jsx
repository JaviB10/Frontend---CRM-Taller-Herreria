import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export const AuthChecker = () => {
    const { token, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenExpiration = () => {
            if (token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    const expTime = decodedToken.exp * 1000;
                    if (Date.now() >= expTime) {
                        handleLogout(); // Token expirado, cerrar sesión
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                    handleLogout(); // En caso de error, cerrar sesión
                }
            }
        };

        // Verificar la expiración de token inmediatamente
        tokenExpiration();

        // Configurar un intervalo para verificar la expiración periódicamente
        const interval = setInterval(tokenExpiration, 60000);

        return () => clearInterval(interval);
    }, [token, handleLogout, navigate]);

    return null;
};