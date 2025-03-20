"use strict";

import dayjs from 'dayjs';

function User(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.allergies = [];
        this.shoppingCart = [];
        this.addAllergycreatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');

        this.addAllergy = (allergy) => this.allergies.push(allergy);
        this.removeAllergy = (allergy) => this.allergies = this.allergies.filter((a) => a !== allergy);
        this.getAllAllergies = () => this.allergies;

        this.addToCart = (bagId) => this.shoppingCart.push(bagId);
        this.removeFromCart = (bagId) => this.shoppingCart = this.shoppingCart.filter((b) => b !== bagId);
        this.getCart = () => this.shoppingCart;

}

const userCollection = [];

function addUser(user) {
    userCollection.push(user);
}

function getUserById(id) {
    return userCollection.find((u) => u.id === id);
}

function getUserByEmail(email) {
    return userCollection.find((u) => u.email === email);
}

function getAllUsers() {
    return userCollection;
}

function updateUser(id, updatedFields) {
    const user = getUserById(id);
    if (user) {
        Object.assign(user, updatedFields);
    }
}

function deleteUser(id) {
    const userIndex = userCollection.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
        userCollection.splice(userIndex, 1);
    }
}

export { 
    User,
    addUser, 
    getUserById, 
    getUserByEmail, 
    getAllUsers, 
    updateUser, 
    deleteUser
};