import React, { useContext } from 'react';
import { Clients } from '../../components';
import { AuthContext } from '../../contexts/AuthContext';

export const Home = () => {

    const { roles } = useContext(AuthContext);

    const hasRole = (roleName) => roles === roleName;

    return (
        <div className="mx-auto">
            <div className="w-full container mx-auto py-14">
                {hasRole('ADMIN') && 
                <p>Bienvenido al sistema 
                    <button type="button" className="bg-gray-200 text-gray-800 mx-2 py-1 px-1 rounded items-center space-x-2" disabled>ADRMINISTRADOR</button>
                </p>}
            </div>
            <div className="container mx-auto">
                <Clients />
            </div>
        </div>
    )
}