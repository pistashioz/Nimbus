// user.js store
import { defineStore } from 'pinia';
import { useWeatherStore } from "@/stores/weather";

export const useUserStore = defineStore("user", {
    state: () => ({
        isUserAuthenticated: false,
        user: JSON.parse(localStorage.getItem('user')) || null,
        users: JSON.parse(localStorage.getItem('users')) || [
            { username: "maria", password: "54321", email: "maria@example.com" },
            { username: "john", password: "12345", email: "john@example.com" },
        ],
    }),
    getters: {
        getUser: (state) => state.user,
        isUser: (state) => state.isUserAuthenticated,
        authenticatedUser: (state) => state.user,
    },
    actions: {
        login(identifier, password) {
            const user = this.users.find(
                (user) => (user.username === identifier || user.email === identifier) && user.password === password
            );

            // Check localStorage if not found in the users array
            if (!user) {
                const localStorageUser = JSON.parse(localStorage.getItem('user'));
                if (localStorageUser && (localStorageUser.username === identifier || localStorageUser.email === identifier) && localStorageUser.password === password) {
                    this.isUserAuthenticated = true;
                    this.user = localStorageUser;

                    const weatherStore = useWeatherStore();
                    weatherStore.updateUserWeather(this.user.userRegion, this.user.userLocations);
                    return;
                }
            }

            if (user) {
                this.isUserAuthenticated = true;
                this.user = { ...user };

                const weatherStore = useWeatherStore();
                weatherStore.updateUserWeather(this.user.userRegion, this.user.userLocations);
            } else {
                throw Error("Invalid credentials!");
            }
        },
        register(email, username, password) {
            const emailExists = this.users.some(user => user.email === email);
            if (emailExists) {
                throw Error("Email already exists!");
            }

            const usernameExists = this.users.some(user => user.username === username);
            if (usernameExists) {
                throw Error("Username already exists!");
            }

            const newUser = {
                username: username,
                email: email,
                password: password,
                nimbusCoins: 50
            };

            this.users.push(newUser);
            localStorage.setItem('users', JSON.stringify(this.users));
        },
        savePreferences(username, preferences) {
            const userIndex = this.users.findIndex((user) => user.username === username);
            if (userIndex !== -1) {
                this.users[userIndex] = { ...this.users[userIndex], ...preferences };
                localStorage.setItem('users', JSON.stringify(this.users));
            } else {
                throw Error("User not found!");
            }
        },
        logout() {
            this.isUserAuthenticated = false;
            this.user = null;
        },
        updateUser(username, newUserData) {
            const userIndex = this.users.findIndex((user) => user.username === username);
            if (userIndex !== -1) {
                this.users[userIndex] = { ...this.users[userIndex], ...newUserData };

                if (newUserData.userPreferences) {
                    this.users[userIndex].userPreferences = [...newUserData.userPreferences];
                }

                if (this.user && this.user.username === username) {
                    this.user = { ...this.user, ...newUserData };

                    if (newUserData.userPreferences) {
                        this.user.userPreferences = [...newUserData.userPreferences];
                    }
                }

                localStorage.setItem('users', JSON.stringify(this.users));
            } else {
                throw Error("User not found!");
            }
        }
    },
    persist: true,
});
