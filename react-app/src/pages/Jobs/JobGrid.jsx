import React from 'react'
import { JobDetail } from './JobDetail.jsx'

export const JobGrid = ({jobs = [], handlerConfirmDelete, onShowDeleteModal, onShowUpdateModal, setJobID }) => {
    return (
        <table className="min-w-full">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 border-r border-gray-300 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 border-r border-gray-300 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Descripcion</th>
                    <th className="px-6 py-3 border-r border-gray-300 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de creación</th>
                    <th className="px-6 py-3 border-r border-gray-300 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto aceptado</th>
                    <th className="px-6 py-3 border-r border-gray-300 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de aceptación</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Finalizacion</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
                {jobs.map(job => (
                        <JobDetail 
                            key={job.id} 
                            job={job}
                            onDeleteClient={handlerConfirmDelete} 
                            onShowDeleteModal={onShowDeleteModal} 
                            onShowUpdateModal={onShowUpdateModal}
                            setJobID={setJobID}   // Asegúrate de pasar `job` como `prop` y no `jobs`
                        />
                ))}
            </tbody>
        </table>
    )
}