import React, { useEffect, useRef, useState } from 'react'
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const JobDetail = ({job, onShowDeleteModal, onShowUpdateModal, setJobID }) => {

    const menuRef = useRef(null);

    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    const isValidDate = (dateString) => {
        if (!dateString) return false; // Maneja el caso de null o undefined
        const date = parseISO(dateString);
        return !isNaN(date.getTime());
    };

    const handleViewBudget = (id) => {
        navigate(`/budget/${id}`);
    }

    const handleShowMenuDelete = (id) => {
        setShowMenu(false);
        setJobID(id);
        onShowDeleteModal();
    }

    const handleShowMenuUpdate = (id) => {
        setShowMenu(false);
        setJobID(id);
        onShowUpdateModal();
    }

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

    return (
        <tr>
            <td className="border-r border-gray-300 text-center">
                <button 
                    onClick={handleMenuToggle}
                    className="text-blue-600 focus:outline-none no-underline"
                >
                    {job.id}
                </button>
                {showMenu && (
                    <div ref={menuRef} className="absolute left-auto mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                        <button 
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => handleViewBudget(job.id)}
                        >
                            Ver Presupuesto
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-2 border-y border-gray-300 text-gray-700 hover:bg-gray-100"
                            onClick={() => handleShowMenuUpdate(job.id)}
                        >
                            Editar Trabajo
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                            onClick={() => handleShowMenuDelete(job.id)}
                        >
                            Eliminar Trabajo
                        </button>
                    </div>
                )}
            </td>
            <td className="border-r border-gray-300 px-4 py-2 text-center">{job.details}</td>
            <td className="border-r border-gray-300 px-4 py-2 text-center">{isValidDate(job.createAt) ? format(parseISO(job.createAt), 'dd/MM/yyyy') : 'Fecha no válida'}</td>
            <td className="border-r border-gray-300 px-4 py-2 text-center">
                {job.budgetAccepted ? 'Si' : 'No'}
            </td>
            <td className="border-r border-gray-300 px-4 py-2 text-center">{isValidDate(job.acceptedAt) ? format(parseISO(job.acceptedAt), 'dd/MM/yyyy') : ''}</td>
            <td className="border-r border-gray-300 px-4 py-2 text-center">{job.finish}</td>
        </tr>
    )
}