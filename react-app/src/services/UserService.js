import axios from './axiosConfig.js'

export const findAll = async () => {
    try {
        const response = await axios.get('clients/');
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const createUser = async ({name, lastname, address, phone}) => {
    try {
        const response = await axios.post('/clients', {
            name: name,
            lastName: lastname,
            address: address,
            phone: phone

        });
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const findClient = async (id) => {
    try {
        const response = await axios.get(`/clients/${id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const updateUser = async ({id, name, lastname, address, phone}) => {
    try {
        const response = await axios.put(`/clients/${id}`, {
            name: name,
            lastName: lastname,
            address: address,
            phone: phone

        });
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const login = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:8080/api/sessions/login', {
            email: credentials.username,
            password: credentials.password
        }, {
            withCredentials: true // Esto permite el envío de cookies con la solicitud
        });
        
        
        if(response.status == 200) {
            const { token, email, role } = response.data.payload
            localStorage.setItem('token', token);
            localStorage.setItem('role', role)
            return { token, username: email, role }
        }
    } catch (error) {
        console.log(error);
    }
    return { token: null, user: null, roles: [] };
}

export const removeClient = async (id) => {
    try {
        const response = await axios.delete(`/clients/${id}`);
        return response; 
    } catch (error) {
        console.error(error);
    }
}

export const getToken = () => {
    return localStorage.getItem('token');
};