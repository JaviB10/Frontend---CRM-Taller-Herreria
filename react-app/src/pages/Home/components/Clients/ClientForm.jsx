import React, { useContext, useState } from "react";
import { createUser } from "../../../../services/UserService";
import { ClientContext } from "../../../../contexts/ClientContext";

export const ClientForm = ({ onClose }) => {
    
    const { allClients } = useContext(ClientContext);

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    async function submit(e) {
        e.preventDefault();
        try {
            const response = await createUser({name, lastname, address, phone});
            if (response.status === 201) {
                allClients();
                onClose();
            } else {
                alert("El cliente no se ha registrado");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <div className="text-center text-2xl font-bold text-gray-600">AGREGAR CLIENTE</div>
                <form onSubmit={submit}>
                    <div className="mt-4">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre"
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            placeholder="Apellido"
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Dirección"
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Contacto"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-4 space-x-2">
                        <button type="button" className="bg-yellow-600 text-white border border-yellow-600 rounded-md px-4 py-2 hover:bg-yellow-500" onClick={onClose}>Cerrar</button>
                        <button type="submit" className="bg-green-600 text-white border border-green-600 rounded-md px-4 py-2 hover:bg-green-500">Crear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}