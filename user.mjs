"use strict";

// Simuliamo un database di utenti
const users = [];

// Funzione per registrare un nuovo utente
export function registerUser(id, username, password, email) {
    if (users.some(user => user.username === username)) {
        throw new Error("Username already taken.");
    }
    const newUser = {
        id,
        username,
        password,
        email,
        reservations: []
    };
    users.push(newUser);
    return newUser;
}

// Funzione per effettuare il login
export function loginUser(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        throw new Error("Invalid username or password.");
    }
    return user;
}

// Funzione per effettuare il logout (simulato, lato server sarebbe gestito con sessioni)
export function logoutUser() {
    return "User logged out.";
}

// Funzione per ottenere i dati di un utente tramite ID
export function getUserDataById(userId) {
    const user = users.find(user => user.id === userId);
    if (!user) {
        throw new Error("User not found.");
    }
    return user;
}

// Funzione per prenotare una bag
export function reserveBag(userId, bag) {
    const user = users.find(user => user.id === userId);
    if (!user) {
        throw new Error("User not found.");
    }
    user.reservations.push(bag);
}

// Funzione per ottenere le prenotazioni di un utente tramite ID
export function getUserReservationsById(userId) {
    const user = users.find(user => user.id === userId);
    if (!user) {
        throw new Error("User not found.");
    }
    return user.reservations;
}