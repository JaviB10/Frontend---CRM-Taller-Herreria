import React, { useContext, useEffect, useState } from 'react'
import { findMaterial, updateMaterial } from '../../services/MaterialService';
import { ClientContext } from '../../contexts/ClientContext';

export const BudgetFormUpdate = ({ id, onClose }) => {

    const { allMaterials } = useContext(ClientContext);

    const [material, setMaterial] = useState({
        materialName: "",
        amount: "",
        price: ""
    })

    useEffect(() => {
      const axioMaterial = async () => {
        try {          
            const response = await findMaterial(id);
            if(response.status === 202) {
                setMaterial(response.data);
            } else {
                alert("No se encontro el material")
            }
        } catch (error) {
            console.log(error); 
        }
      }
      axioMaterial();
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaterial((prevMaterial) => ({
            ...prevMaterial,
            [name]: value
        }));
    };

    async function submit (e) {
        e.preventDefault();
        try {
            const {
                materialName,
                amount,
                price
            } = material
            const response = await updateMaterial({materialName, amount, price, id})
            if (response.status === 202) {
                allMaterials();
                onClose();
            } else {
                alert("No se pudo actualizar el material");
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <div className="text-center text-2xl font-bold text-gray-600">ACTUALIZAR MATERIAL</div>
                <form onSubmit={submit}>
                    <div className="mt-4">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="text"
                            name="materialName"
                            value={material.materialName}
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
                            value={material.amount}
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
                            value={material.price}
                            onChange={handleChange}
                            placeholder="Precio unitario"
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