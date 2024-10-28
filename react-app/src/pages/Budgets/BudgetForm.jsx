import React, { useContext, useState } from 'react'
import { createMaterial } from '../../services/MaterialService';
import { ClientContext } from '../../contexts/ClientContext';

export const BudgetForm = ({ jobID, onClose }) => {

    const { budgetID, allMaterials } = useContext(ClientContext); 

    const [materials, SetMaterials] = useState({
        materialName: "",
        amount: undefined,
        price: undefined
    });

    async function submit (e) {
        e.preventDefault();

        try {

            const {
                materialName,
                amount,
                price
            } = materials

            const response = await createMaterial({materialName, amount, price, id: budgetID})

            if (response.status === 201) {
                allMaterials(jobID);
                onClose();
            } else {
                alert("No se pudo registrar el material");
            }
        } catch (error) {
            console.log(error);   
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        SetMaterials((prevMaterials) => ({
            ...prevMaterials,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <div className="text-center text-2xl font-bold text-gray-600">AGREGAR MATERIAL</div>
                <form onSubmit={submit}>
                    <div className="mt-4">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="text"
                            name="materialName"
                            value={materials.materialName}
                            onChange={handleChange}
                            placeholder="Nombre del material"
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="number"
                            name="amount"
                            value={materials.amount}
                            onChange={handleChange}
                            placeholder="Cantidad"
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="number"
                            name="price"
                            value={materials.price}
                            onChange={handleChange}
                            placeholder="Precio unitario"
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