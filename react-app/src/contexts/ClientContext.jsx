import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';
import { findAll, findClient } from '../services/UserService';
import { findJob } from '../services/JobServices';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {

    const { token } = useContext(AuthContext);

    const [clients, setClients] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [materials, setMaterials] = useState([]);

    const [jobID, setJobID] = useState("");
    const [budgetID, setBudgetID] = useState("");

    const allClients = async () => {
        try {
            const response = await findAll();
            setClients(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const oneClient = async (id) => {
        try {
            const response = await findClient(id)  
            setJobs(response.data.jobs);
            console.log(jobs);
        } catch (error) {
            console.log(error);
        }
    }

    const oneJob = async (id) => {
        try {
            const response = await findJob(id);
            setJobID(response.data.id);
            setBudgetID(response.data.budget.id)
            setMaterials(response.data.budget.materials);
        } catch (error) {
            console.log(error);
        }
    }

    const allJobs = async (id) => {
        oneClient(id);
    }

    const allMaterials = async (id) => {
        oneJob(id);
    }

    useEffect(() => {
        allClients();
    }, [token])
    
    return (
        <ClientContext.Provider value={{ 
            // Clients
            clients, 
            allClients, 
            oneClient, 
        
            // Jobs
            jobs, 
            allJobs, 
            oneJob, 
            jobID, 
        
            // Materials
            materials, 
            allMaterials, 
        
            // Budget
            budgetID 
        }}>
            {children}
        </ClientContext.Provider>
    )
}