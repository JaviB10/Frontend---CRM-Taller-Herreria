import React, { useContext, useEffect, useState } from 'react'
import { findJob, updateJob } from '../../services/JobServices';
import { ClientContext } from '../../contexts/ClientContext';

export const JobFormUpdate = ({jobID, clientID, onClose}) => {

    const { allJobs } = useContext(ClientContext);
    const [job, setJob] = useState({ details: "", budgetAccepted: false });

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await findJob(jobID);
                if (response.status === 202) {
                    setJob(response.data);
                } else {
                    alert("El trabajo no se encuentra");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchClient();
    }, [jobID]);

    async function submit(e) {
        e.preventDefault();
        try {
            const { 
                details, 
                budgetAccepted 
            } = job;
            
            const response = await updateJob({ id: jobID, details, budgetAccepted });
            
            if (response.status === 202) {
                allJobs(clientID);
                onClose();
            } else {
                alert("El trabajo no se ha registrado");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob((prevJob) => ({
            ...prevJob,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <div className="text-center text-2xl font-bold text-gray-600">ACTUALIZAR TRABAJO</div>
                <form onSubmit={submit}>
                    <div className="input-group mt-4">
                        <input
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            type="text"
                            name="details"
                            value={job.details}
                            onChange={handleChange}
                            placeholder="Detalle"
                            required
                        />
                    </div>
                    <div className="input-group mt-4">
                        <select
                            className="bg-gray-200 border border-gray-300 rounded-md p-2 w-full"
                            name="budgetAccepted"
                            value={job.budgetAccepted}
                            onChange={handleChange}
                            required
                        >
                            <option value={true}>Sí</option>
                            <option value={false}>No</option>
                        </select>
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