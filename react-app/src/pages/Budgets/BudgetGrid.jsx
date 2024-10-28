import React from 'react'
import { BudgetDetail } from './BudgetDetail'

export const BudgetGrid = ({ materials = [], handlerConfirmDelete, onShowDeleteModal, onShowUpdateModal, setMaterialID }) => {
    return (
        <table className="min-w-full">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 border-r border-gray-300 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 border-r border-gray-300 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 border-r border-gray-300 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Precio unitario</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
                {materials.map(material => {
                    return <BudgetDetail
                        key={material.id}
                        material={material}
                        onDeleteClient={handlerConfirmDelete}
                        onShowDeleteModal={onShowDeleteModal}
                        onShowUpdateModal={onShowUpdateModal}
                        setMaterialID={setMaterialID}
                    />
                })}
            </tbody>
        </table>
    )
}