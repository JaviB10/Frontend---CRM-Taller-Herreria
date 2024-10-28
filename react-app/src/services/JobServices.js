import axios from "axios"
import { getToken } from "./UserService"

export const findJob = async (id) => {
    const token = getToken();
    try {
        const response = await axios.get(`http://localhost:8080/api/jobs/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const createJob = async ({id, details}) => {
    const token = getToken();
    try {
        const response = await axios.post(`http://localhost:8080/api/jobs/${id}`, {
            details: details,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const updateJob = async ({id, details, budgetAccepted}) => {
    const token = getToken();
    
    try {
        const response = await axios.put(`http://localhost:8080/api/jobs/${id}`, {
                details: details,
                budgetAccepted: budgetAccepted
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("respuesta de la actualizacion", response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const createBudget = async (id) => {
    const token = getToken();
    try {
        const response = await axios.post(`http://localhost:8080/api/budgets/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const findBudget = async (id) => {
    const token = getToken();
    try {
        const response = await axios.get(`http://localhost:8080/api/budgets/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const removeJob = async (id) => {
    const token = getToken();
    try {
        const response = await axios.delete(`http://localhost:8080/api/jobs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}