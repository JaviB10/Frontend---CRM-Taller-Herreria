import React, { useContext, useState } from 'react'
import { createBudget, createJob } from '../../services/JobServices';
import { ClientContext } from '../../contexts/ClientContext';

export const JobForm = ({ clientID, onClose }) => {

    const { allJobs } = useContext(ClientContext);

    const [details, setDetails] = useState("")

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await createJob({details, id: clientID});

            if (response.status === 201) {

                const jobID = response.data.id

                try {
                    const res = await createBudget(jobID);
                    
                    if (res.status === 201) {
                        allJobs(clientID);
                        onClose();
                    } else {
                        alert("El presupuesto no se ha registrado");
                    }
                } catch (error) {
                    console.error("Error al crear el presupuesto:", error);
                }
            } else {
                alert("El trabajo no se ha registrado");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <div className="text-center text-2xl font-bold text-gray-600">AGREGAR TRABAJO</div>
                <form onSubmit={submit}>
                    <div className="mt-4">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="text"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Detalle"
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
