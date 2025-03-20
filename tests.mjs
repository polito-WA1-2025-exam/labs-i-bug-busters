"use strict";

import dayjs from 'dayjs';
import {User, addUser, getUserById, getUserByEmail, getAllUsers, updateUser, deleteUser} from './user.mjs';

// Create new users
const user1 = new User(1, "MarcoRavaioli", "mr@polito.it", "marco123");
const user2 = new User(2, "FabioMastroianni", "fm@polito.it", "fabio123");

// Add users to the collection
addUser(user1);
addUser(user2);

// Log all users
console.log("All the users: ", getAllUsers());

// Get user by ID
console.log("User with id 1: ", getUserById(1));

// Get user by email
console.log("User with email \"fm@polito.it\": ", getUserByEmail("fm@polito.it"));

// Update user with ID 2
updateUser(2, { name: "FabioMastromauro", password: "fabio321" });
console.log("User with id 2 after update: ", getUserById(2));

// Delete user with ID 2
deleteUser(2);
console.log("All the users after deletion: ", getAllUsers());

// Add allergies for user1
const userTest1 = getUserById(1);
userTest1.addAllergy("gluten");
userTest1.addAllergy("peanuts");
console.log("Allergies of user with id 1: ", getUserById(1).getAllAllergies());

// Add reservations for user1
const userTest2 = getUserById(1);
userTest2.addToCart(101);
userTest2.addToCart(102);
console.log("Cart of user with id 1: ", getUserById(1).getCart());

// Remove reservation with ID 101 for user1
const userTest3 = getUserById(1);
userTest3.removeFromCart(101);
console.log("Cart of user with id 1 after removal: ", getUserById(1).getCart());
