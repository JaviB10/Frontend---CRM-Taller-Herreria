import React, { useContext, useState } from 'react';
import { iconUsername, iconPassword, iconLogo } from '../../assets';
import { AuthContext } from '../../contexts/AuthContext';

export const Login = () => {

    const { login } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({ username: "", password: "" });
    
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(credentials);
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="hidden md:flex w-full md:w-1/2 bg-black justify-center items-center">
                <div className="text-center">
                    <img src={iconLogo} alt="brand-logo" className="h-52 mx-auto" />
                </div>
            </div>
            <div className="flex w-full md:w-1/2 bg-yellow-300 justify-center items-center min-h-screen md:min-h-0 px-3">
                <div className="bg-black p-5 rounded-lg text-gray-600 shadow-lg" style={{ width: '25rem' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="flex">
                            <div className="bg-yellow-300 p-2 rounded-l-md flex items-center">
                                <img src={iconUsername} alt="username-icon" className="h-4" />
                            </div>
                            <input
                                className="flex-grow bg-gray-100 border border-gray-300 focus:outline-none p-2 rounded-r-md"
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Usuario"
                                required
                            />
                        </div>
                        <div className="flex mt-4">
                            <div className="bg-yellow-300 p-2 rounded-l-md flex items-center">
                                <img src={iconPassword} alt="password-icon" className="h-4" />
                            </div>
                            <input
                                className="flex-grow bg-gray-100 border border-gray-300 focus:outline-none p-2 rounded-r-md"
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Contraseña"
                                required
                            />
                        </div>
                        <div>
                            <button className="bg-yellow-300 text-black w-full mt-4 py-2 font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition duration-300" type="submit">
                                Ingresar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}