import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ClientDetail = ({ clients = {}, onShowDeleteModal, onShowUpdateModal, setClientID }) => {

    const menuRef = useRef(null);

    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    const handlerViewJobs = (id) => {
        navigate(`/jobs/${id}`);
    };

    const handleShowMenuDelete = (id) => {
        setShowMenu(false);
        setClientID(id);
        onShowDeleteModal();
    };

    const handleShowMenuUpdate = (id) => {
        setShowMenu(false);
        setClientID(id);
        onShowUpdateModal();
    };

    const handleMenuToggle = () => {
        setShowMenu(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    return(
        <tr>
            <td className="border-r border-gray-300 text-center">
                <button 
                    onClick={handleMenuToggle}
                    className="text-blue-600 focus:outline-none no-underline"
                >
                    {clients.id}
                </button>
                {showMenu && (
                    <div ref={menuRef} className="absolute left-auto mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                        <button 
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => handlerViewJobs(clients.id)}
                        >
                            Ver Trabajos
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-2 border-y border-gray-300 text-gray-700 hover:bg-gray-100"
                            onClick={() => handleShowMenuUpdate(clients.id)}
                        >
                            Editar Cliente
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                            onClick={() => handleShowMenuDelete(clients.id)}
                        >
                            Eliminar Cliente
                        </button>
                    </div>
                )}
            </td>
            <td className="border-r border-gray-300 px-4 py-2 text-center">{clients.name}</td>
            <td className="border-r border-gray-300 px-4 py-2 text-center">{clients.lastname}</td>
            <td className="border-r border-gray-300 px-4 py-2 text-center">{clients.address}</td>
            <td className="px-4 py-2 text-center">{clients.phone}</td>
        </tr>
    )
}