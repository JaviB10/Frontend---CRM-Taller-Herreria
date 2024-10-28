import React, { useEffect, useRef, useState } from 'react'

export const BudgetDetail = ({ material, onShowDeleteModal, onShowUpdateModal, setMaterialID }) => {

    const menuRef = useRef(null);

    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenuDelete = (id) => {
        setShowMenu(false);
        setMaterialID(id);
        onShowDeleteModal();
    }

    const handleShowMenuUpdate = (id) => {
        setShowMenu(false);
        setMaterialID(id);
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
                    {material.id}
                </button>
                {showMenu && (
                    <div ref={menuRef} className="absolute left-auto mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                        <button 
                            className="block w-full text-left px-4 py-2 border-y border-gray-300 text-gray-700 hover:bg-gray-100"
                            onClick={() => handleShowMenuUpdate(material.id)}
                        >
                            Editar Material
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                            onClick={() => handleShowMenuDelete(material.id)}
                        >
                            Eliminar Material
                        </button>
                    </div>
                )}
            </td>
            <td className="border-r border-gray-300 px-4 py-2 text-center">{material.materialName}</td>
            <td className="border-r border-gray-300 px-4 py-2 text-center">{material.amount}</td>
            <td className="border-r border-gray-300 px-4 py-2 text-center">{material.price}</td>        
        </tr>
    )
}