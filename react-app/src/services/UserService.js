import axios from "axios";

export const findAll = async () => {
    const token = getToken();
    try {
        const response = await axios.get('http://localhost:8080/api/clients/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const createUser = async ({name, lastname, address, phone}) => {
    const token = getToken();
    try {
        const response = await axios.post('http://localhost:8080/api/clients', {
            name: name,
            lastname: lastname,
            address: address,
            phone: phone

        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const findClient = async (id) => {
    const token = getToken();
    try {
        const response = await axios.get(`http://localhost:8080/api/clients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const updateUser = async ({id, name, lastname, address, phone}) => {
    const token = getToken();
    try {
        const response = await axios.put(`http://localhost:8080/api/clients/${id}`, {
            name: name,
            lastname: lastname,
            address: address,
            phone: phone

        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export const login = async (credentials) => {
    console.log("esto llega al service", credentials);
    try {
        const response = await axios.post('http://localhost:8080/login', {
            username: credentials.username,
            password: credentials.password
        })
        if(response.status == 200) {
            const { token, username, roles } = response.data
            localStorage.setItem('token', token);
            localStorage.setItem('roles', JSON.stringify(roles))
            return { token, username, roles }
        }
    } catch (error) {
        console.log(error);
    }
    return { token: null, user: null };
}

export const removeClient = async (id) => {
    const token = getToken();

    try {
        const response = await axios.delete(`http://localhost:8080/api/clients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response; 
    } catch (error) {
        console.error(error);
    }
}

export const getToken = () => {
    return localStorage.getItem('token');
};