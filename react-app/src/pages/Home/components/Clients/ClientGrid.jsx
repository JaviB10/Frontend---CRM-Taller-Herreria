import React from "react";
import { ClientDetail } from "./ClientDetail";

export const ClientGrid = ({ clients = [], handlerConfirmDelete, onShowDeleteModal, onShowUpdateModal, setClientID }) => {
    return(
        <table className="min-w-full">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 border-r border-gray-300 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 border-r border-gray-300 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 border-r border-gray-300 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                    <th className="px-6 py-3 border-r border-gray-300 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
                {clients.map(client => (
                    <ClientDetail 
                        key={client.id}
                        clients={client} 
                        onDeleteClient={handlerConfirmDelete} 
                        onShowDeleteModal={onShowDeleteModal} 
                        onShowUpdateModal={onShowUpdateModal}
                        setClientID={setClientID}  
                    />
                ))}
            </tbody>
        </table>
    )
}