import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { iconLogo, iconLogout } from '../../assets';
import { AuthContext } from '../../contexts/AuthContext';
import { ActionButtom } from '../index';

export const NavBar = () => {

    const { handleLogout } = useContext(AuthContext);

    return(
        <nav className="bg-zinc-950">
            <div className="mx-auto px-2">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-start">
                        <Link to="/" className="flex flex-shrink-0 items-center">
                            <img className="h-12 w-auto" src={iconLogo} alt="Your Company" />
                        </Link>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                            <div>
                                <ActionButtom
                                    onClick={handleLogout}
                                    icon={iconLogout}
                                    text="Cerrar Sesión"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}