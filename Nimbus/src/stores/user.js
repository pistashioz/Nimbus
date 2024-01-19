import { defineStore } from "pinia";
import { useWeatherStore } from "@/stores/weather"; // Import weather store

export const useUserStore = defineStore("user", {
    state: () => ({
        // Tracks if a user is authenticated
        isUserAuthenticated: false,
        // Stores the current authenticated user's data
        user: null,
/*         // Store the just registered user's data
        registeredUser: null, */

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
        authenticatedUser: (state) => state.user,
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
        
                // Update weather data after successful login
                const weatherStore = useWeatherStore();
                weatherStore.updateUserWeather(this.user.userRegion, this.user.userLocations);
              } else {
                throw Error("Invalid credentials!");
              }
            },
            // Action to register a new user
            register(email, username, password) {
                // Check if the email already exists
                const emailExists = this.users.some(user => user.email === email);
                if (emailExists) {
                    throw Error("Email already exists!");
                }

                // Check if the username already exists
                const usernameExists = this.users.some(user => user.username === username);
                if (usernameExists) {
                    throw Error("Username already exists!");
                }

                // Create new user with initial nimbusCoin value
                const newUser = {
                    username: username,
                    email: email,
                    password: password,
                    nimbusCoins: 50 // Initial coins set to 50
                };

                // Add new user to users array
                this.users.push(newUser);

                // Optionally set the registered user in the store
                /* this.registeredUser = newUser.username; */ // this was supposed to be to be used on the beforerouteleave on the personalization form...
            },
       
        savePreferences(username, preferences) {
            // Find the user by username
            const userIndex = this.users.findIndex((user) => user.username === username);
            if (userIndex!== -1) {
        
                // Update user data and maintain reactivity
                this.users[userIndex] = {...this.users[userIndex],...preferences };
                // Update the current user data if the user is logged in
/*                 if (this.user && this.user.username === username) {
                    this.user = {...this.user,...preferences };
                } */

            } else {
                throw Error("User not found!");
            }
        },
        // Action to log out the current user
        logout() {
            console.log('logging out');
            this.isUserAuthenticated = false;
            this.user = null;
            this.registeredUser = null;
        },
// Action to update user's data including preferences
updateUser(username, newUserData) {
    const userIndex = this.users.findIndex((user) => user.username === username);
    if (userIndex !== -1) {
        // Update general user data and maintain reactivity
        this.users[userIndex] = { ...this.users[userIndex], ...newUserData };

        // Check if newUserData contains userPreferences and update it separately
        if (newUserData.userPreferences) {
            this.users[userIndex].userPreferences = [...newUserData.userPreferences];
        }

          // Additional logic for updating userLang
          if (newUserData.userLang) {
            this.user.userLang = newUserData.userLang;
          }

        // Update the current user data if the user is logged in
        if (this.user && this.user.username === username) {
            this.user = { ...this.user, ...newUserData };

            // Update userPreferences for the current user if it's included in newUserData
            if (newUserData.userPreferences) {
                this.user.userPreferences = [...newUserData.userPreferences];
            }
        }
    } else {
        throw Error("User not found!");
    }
}

    },  
    persist: true,  // Enables data persistence using Pinia's persist plugin
});