import React, { useContext, useState } from "react";
import { ClientGrid } from "./ClientGrid.jsx";
import { ClientForm } from "./ClientForm.jsx";
import { iconAddClient } from "../../../../assets/index.jsx";
import { ClientContext } from "../../../../contexts/ClientContext.jsx";
import { ActionButtom } from "../../../../components/index.jsx";
import { Modal } from "../../../../components/index.jsx";
import { removeClient } from "../../../../services/UserService.js";
import { ClientFormUpdate } from "./ClientFormUpdate.jsx";

export const Clients = () => {

    const { clients, allClients } = useContext(ClientContext)

    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [clientID, setClientID] = useState(null);

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

    const handlerConfirmDelete = async (clientID) => {
        try {
            const response = await removeClient(clientID);
            if(response.status === 202) {
                allClients();
                handleCloseDeleteModal();
            } else {
                console.log("No se pudo eliminar el cliente");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="container my-4">
            <div className="row">
                <div className="col-12">
                    <ActionButtom
                        onClick={handleShowModal}
                        icon={iconAddClient}
                        text="Agregar Cliente"
                    />
                </div>
                <div className="mx-auto overflow-x-auto border border-gray-300 shadow-md rounded-lg">
                    {
                        clients.length > 0 ? (
                            <ClientGrid 
                                clients={clients} 
                                onDeleteClient={handlerConfirmDelete} 
                                onShowDeleteModal={handleShowDeleteModal} 
                                onShowUpdateModal={handleShowUpdateModal}
                                setClientID={setClientID} 
                            />
                        ) : (
                            <div className="alert alert-warning">No hay clientes en el sistema!</div>
                        )
                    }
                </div>
                <Modal show={showModal}>
                    <ClientForm onClose={handleCloseModal}/>
                </Modal>
                <Modal show={showModalDelete}>
                    <p className="text-center text-2xl font-bold text-white">¿Estás seguro de que deseas eliminar este cliente?</p>
                    <div className="flex justify-end mt-4 space-x-2">
                        <button className="w-1/2 bg-red-600 text-white border border-red-600 rounded-md px-4 py-2 hover:bg-red-500" onClick={() => handlerConfirmDelete(clientID)}>
                            Sí
                        </button>
                        <button className="w-1/2 bg-gray-600 text-white border border-gray-600 rounded-md px-4 py-2 hover:bg-gray-500" onClick={handleCloseDeleteModal}>
                            No
                        </button>
                    </div>
                </Modal>
                <Modal show={showModalUpdate}>
                    <ClientFormUpdate id={clientID} onClose={handleCloseUpdateModal} />
                </Modal>
            </div>
        </div>
    )
}