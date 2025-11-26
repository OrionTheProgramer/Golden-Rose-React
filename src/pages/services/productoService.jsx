import axios from "axios";

const API_URL = "http://54.243.112.243:8004/api/productos"

export async function getProductos() {
    // Espera la respuesta
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log("Error fetching productos:", error);
        throw error;
    }
    
}