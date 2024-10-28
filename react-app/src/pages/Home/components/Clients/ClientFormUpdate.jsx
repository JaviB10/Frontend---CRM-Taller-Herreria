import React, { useContext, useEffect, useState } from "react";
import { findClient, updateUser } from "../../../../services/UserService.js";
import { ClientContext } from "../../../../contexts/ClientContext.jsx"

export const ClientFormUpdate = ({ id, onClose }) => {

    const { allClients } = useContext(ClientContext);
    const [client, setClient] = useState({
        name: '',
        lastname: '',
        address: '',
        phone: ''
    });
    
    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await findClient(id);
                if (response.status === 200) {
                    setClient(response.data)
                } else {
                    alert("El cliente no se encuentra");
                }
            } catch (error) {
                alert("Detalles incorrectos");
                console.error(error);
            }
        };
        fetchClient();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("esto viene del handle", name, value);
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value
        }));
    };

    async function submit(e) {
        e.preventDefault();
        try {

            const {
                name,
                lastname,
                address,
                phone
            } = client;

            const response = await updateUser({id, name, lastname, address, phone});

            if (response.status === 202) {
                allClients();
                onClose();
            } else {
                alert("El cliente no se ha podido actualizar");
            }
        } catch (error) {
            alert("Detalles incorrectos");
            console.error(error);
        }
    }

    return(
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <div className="text-center text-2xl font-bold text-gray-600">ACTUALIZAR CLIENTE</div>
                <form onSubmit={submit}>
                    <div className="mt-4">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="text"
                            name="name"
                            value={client.name}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="text"
                            name="lastname"
                            value={client.lastname}
                            onChange={handleChange}
                            placeholder="Apellido"
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="text"
                            name="address"
                            value={client.address}
                            onChange={handleChange}
                            placeholder="Dirección"
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="text"
                            name="phone"
                            value={client.phone}
                            onChange={handleChange}
                            placeholder="Contacto"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-4 space-x-2">
                        <button type="button" className="bg-yellow-600 text-white border border-yellow-600 rounded-md px-4 py-2 hover:bg-yellow-500" onClick={onClose}>Cerrar</button>
                        <button type="submit" className="bg-green-600 text-white border border-green-600 rounded-md px-4 py-2 hover:bg-green-500">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}