import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as userLogin } from '../services/UserService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [username, setUsername] = useState(null);

    const [roles, setRoles] = useState(() => {
        const rolesFromStorage = localStorage.getItem('roles');
        return rolesFromStorage ? JSON.parse(rolesFromStorage) : [];
    });

    const [token, setToken] = useState(localStorage.getItem('token'));
    
    const navigate = useNavigate();

    const login = async (credentials) => {
        try {
            const { token, username, roles: rolesString } = await userLogin(credentials);
            
            const parsedRoles = rolesString ? JSON.parse(rolesString) : [];
            const roleList = parsedRoles.map(role => role.authority || role);

            setToken(token);
            setUsername(username);
            setRoles(roleList);

            navigate("/home");
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    const handleLogout = () => {
        setToken(null);
        setUsername(null);
        setRoles([]);
        localStorage.removeItem('token');
        localStorage.removeItem('roles')
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{ username, token, roles, login, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}