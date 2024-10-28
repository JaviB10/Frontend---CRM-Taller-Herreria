import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { iconAddClient } from '../../assets';
import { JobGrid } from './JobGrid.jsx';
import { ActionButtom, Modal } from '../../components/index.jsx';
import { ClientContext } from '../../contexts/ClientContext.jsx';
import { JobForm } from './JobForm';
import { removeJob } from '../../services/JobServices.js';
import { JobFormUpdate } from './JobFormUpdate.jsx';

export const Jobs = () => {

    const { oneClient, jobs, allJobs } = useContext(ClientContext);

    const {id} = useParams();

    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [jobID, setJobID] = useState(null);

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

    const handlerConfirmDelete = async (jobID) => {
        try {
            const response = await removeJob(jobID);
            if(response.status === 202) {
                allJobs(id);
                handleCloseDeleteModal();
            } else {
                console.log("No se pudo eliminar el trabajo");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchJob = async () => {
            try {
                await oneClient(id);     
            } catch (error) {
                console.error(error);
            }
        };
        fetchJob();
    }, [id]);

    return (
        <div className="container mx-auto">
            <div className="row">
                <div className="col-12">
                <ActionButtom
                        onClick={handleShowModal}
                        icon={iconAddClient}
                        text="Agregar Trabajo"
                    />
                </div>
                <div className="mx-auto overflow-x-auto border border-gray-300 shadow-md rounded-lg">
                    {jobs.length > 0 ? (
                            <JobGrid 
                                jobs={jobs}
                                onDeleteJob={handlerConfirmDelete} 
                                onShowDeleteModal={handleShowDeleteModal} 
                                onShowUpdateModal={handleShowUpdateModal}
                                setJobID={setJobID} 
                            />
                        ) : (
                            <div className="alert alert-warning">No hay trabajos para este cliente!</div>
                    )}
                </div>
                <Modal show={showModal}>
                    <JobForm clientID={id} onClose={handleCloseModal}/>
                </Modal>
                <Modal show={showModalDelete}>
                    <p className="text-center text-2xl font-bold text-white">¿Estás seguro de que deseas eliminar este trabajo?</p>
                    <div className="flex justify-end mt-4 space-x-2">
                        <button className="w-1/2 bg-red-600 text-white border border-red-600 rounded-md px-4 py-2 hover:bg-red-500" onClick={() => handlerConfirmDelete(jobID)}>
                            Sí
                        </button>
                        <button className="w-1/2 bg-gray-600 text-white border border-gray-600 rounded-md px-4 py-2 hover:bg-gray-500" onClick={handleCloseDeleteModal}>
                            No
                        </button>
                    </div>
                </Modal>
                <Modal show={showModalUpdate}>
                    <JobFormUpdate jobID={jobID} clientID={id} onClose={handleCloseUpdateModal} />
                </Modal>
                
            </div>
        </div>
    )
}