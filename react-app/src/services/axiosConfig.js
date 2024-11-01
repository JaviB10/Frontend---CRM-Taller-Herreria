// src/services/axiosConfig.js
import axios from 'axios';

// Configurar axios para permitir el envío de cookies
axios.defaults.withCredentials = true;

// Establecer la URL base para las peticiones (ajusta según sea necesario)
axios.defaults.baseURL = 'http://localhost:8080/api/';

export default axios;