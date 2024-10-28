import axios from "axios";
import { getToken } from "./UserService"

export const createMaterial = async ({materialName, amount, price, id}) => {

    const token = getToken();

    try {
        const response = await axios.post(`http://localhost:8080/api/materials/${id}`, {
            materialName: materialName,
            amount: amount,
            price: price
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const findMaterial = async (id) => {
    
    const token = getToken();

    try {
        const response = await axios.get(`http://localhost:8080/api/materials/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateMaterial = async ({ materialName, amount, price, id }) => {

    const token = getToken();

    try {
        const response = await axios.put(`http://localhost:8080/api/materials/${id}`, {
            materialName: materialName,
            amount: amount,
            price: price
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteMaterial = async (id) => {

    const token = getToken();

    try {
        const response = await axios.delete(`http://localhost:8080/api/materials/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}