import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BudgetGrid } from './BudgetGrid';
import { ClientContext } from '../../contexts/ClientContext';
import { ActionButtom, Modal } from '../../components'
import { iconAddClient } from '../../assets';
import { BudgetForm } from './BudgetForm';
import { deleteMaterial } from '../../services/MaterialService';
import { BudgetFormUpdate } from './BudgetFormUpdate';

export const Budgets = () => {
    
    const { materials, oneJob, allMaterials } = useContext(ClientContext);

    const { id } = useParams();

    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [materialID, setMaterialID] = useState(null);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowDeleteModal = () => {
        setShowModalDelete(true);
    };

    const handleShowUpdateModal = () => {
        setShowModalUpdate(true);
    };

    const handleCloseDeleteModal = () => {
        setShowModalDelete(false);
    };

    const handleCloseUpdateModal = () => {
        setShowModalUpdate(false);
    };

    const handlerConfirmDelete = async (materialID) => {
        try {
            const response = await deleteMaterial(materialID);
            if(response.status === 202) {
                allMaterials(id);
                handleCloseDeleteModal();
            } else {
                console.log("No se pudo eliminar el material");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const axioBudget = async () => {
            try {
                await oneJob(id);
            } catch (error) {
                console.error(error);
            }
        };
        axioBudget();
    }, [id]);

    return (
        <div className="container mx-auto">
            <div className="row">
                <div className="col-12">
                    <ActionButtom
                        onClick={handleShowModal}
                        icon={iconAddClient}
                        text="Agregar Material"
                    />
                </div>
                <div className="mx-auto overflow-x-auto border border-gray-300 shadow-md rounded-lg">
                    {
                        materials.length > 0 ? (
                            <BudgetGrid 
                                materials={materials}
                                onDeleteJob={handlerConfirmDelete} 
                                onShowDeleteModal={handleShowDeleteModal} 
                                onShowUpdateModal={handleShowUpdateModal}
                                setMaterialID={setMaterialID}  
                            />
                        ) : (
                            <div className="alert alert-warning">No hay materiales en el presupuesto!</div>
                    )}
                </div>
                <Modal show={showModal}>
                    <BudgetForm jobID={id} onClose={handleCloseModal}/>
                </Modal>
                <Modal show={showModalDelete}>
                    <p className="text-center text-2xl font-bold text-white">¿Estás seguro de que deseas eliminar este trabajo?</p>
                    <div className="flex justify-end mt-4 space-x-2">
                        <button className="w-1/2 bg-red-600 text-white border border-red-600 rounded-md px-4 py-2 hover:bg-red-500" onClick={() => handlerConfirmDelete(materialID)}>
                            Sí
                        </button>
                        <button className="w-1/2 bg-gray-600 text-white border border-gray-600 rounded-md px-4 py-2 hover:bg-gray-500" onClick={handleCloseDeleteModal}>
                            No
                        </button>
                    </div>
                </Modal>
                <Modal show={showModalUpdate}>
                    <BudgetFormUpdate id={materialID} onClose={handleCloseUpdateModal} />
                </Modal>
            </div>
         </div>
    )
}