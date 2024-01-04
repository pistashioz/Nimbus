import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        // Tracks if a user is authenticated
        isUserAuthenticated: false,
        // Stores the current authenticated user's data
        user: null,
        // Array of user objects
        users: [
            { username: "maria", password: "54321", email: "maria@example.com" },
            { username: "john", password: "12345", email: "john@example.com" },
        ],
    }),
    getters: {
        // Getter to access the current user's data
        getUser: (state) => state.user,
        // Getter to check if a user is authenticated
        isUser: (state) => state.isUserAuthenticated,
    },
    actions: {
        // Action to authenticate a user
        login(identifier, password) {
            // Find the user by username or email
            const user = this.users.find(
                (user) => (user.username === identifier || user.email === identifier) && user.password === password
            );
            if (user) {
                this.isUserAuthenticated = true;
                this.user = { ...user };
            } else {
                throw Error("Invalid credentials!");
            }
        },
        // Action to log out the current user
        logout() {
            this.isUserAuthenticated = false;
            this.user = null;
        },
        // Action to update user's data
        updateUser(username, newUserData) {
            const userIndex = this.users.findIndex((user) => user.username === username);
            if (userIndex !== -1) {
                // Update user data and maintain reactivity
                this.users[userIndex] = { ...this.users[userIndex], ...newUserData };
                // Update the current user data if the user is logged in
                if (this.user && this.user.username === username) {
                    this.user = { ...this.user, ...newUserData };
                }
            } else {
                throw Error("User not found!");
            }
        }
    },  
    persist: true,  // Enables data persistence using Pinia's persist plugin
});
