import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as userLogin } from '../services/UserService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [username, setUsername] = useState(null);
    const [roles, setRoles] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    
    const navigate = useNavigate();

    const login = async (credentials) => {
        try {
            const { token, username, role } = await userLogin(credentials);
            console.log(token);
            
            setToken(token);
            setUsername(username);
            setRoles(role);

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
        localStorage.removeItem('role')
        navigate("/login")
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ username, token, roles, login, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}