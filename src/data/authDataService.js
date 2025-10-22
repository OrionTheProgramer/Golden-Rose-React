// src/data/authDataService.js

const CLAVE_ALMACENAMIENTO = 'goldenRose_users';

let USERS = [
    {username:"admin", email: "admin@profesor.duoc.cl", password: "admin0123", role: "admin"},
    {username:"cliente1", email: "cliente1@gmail.com", password: "client11", role: "client"},
    {username:"cliente2", email: "cliente2@duoc.cl", password: "client22", role: "client"},
];

// Ayuda a cargar y guardar en el localStorage
const cargarUsers = () => {
    const storedUsers = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    
    return storedUsers ? JSON.parse(storedUsers) : [...USERS];
}

const guardarUsers = (actualUsers) => {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(actualUsers));
}

let users = cargarUsers();


// Verifica las credenciales
export const verificarCredenciales = (email, password) => {
    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (user) {
        return {
            token: "simulacion_token_" + user.role + "_" + Date.now(),
            role: user.role
        };
    }
    return null;
}

// Registro de usuario con validaciones
export const registroUser = (email, password) => {
    
    const dominio = email.split('@')[1];
    let role = 'client';

    if (dominio === 'profesor.duoc.cl'){
        role = 'admin'
    }

    if (users.some(u => u.email === email)) {
        throw new Error("El correo ya está registrado.");
    }

    const nuevoUser = { email, password, role};
    
    users.push(nuevoUser);
    

    guardarUsers(users); 
    
    console.log("Nuevo usuario registrado: ", nuevoUser);
    return nuevoUser;
};

// Devuelve todos los usuarios
export const ObtenerTodosUsers = () => {
    return [...users];
};