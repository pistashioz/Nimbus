import { defineStore } from 'pinia';
import { useWeatherStore } from '@/stores/weather';

export const useUserStore = defineStore("user", {
    state: () => ({
        isUserAuthenticated: false,
        user: JSON.parse(localStorage.getItem("user")) || null,
    }),
    getters: {
        getUser: state => state.user,
        isUser: state => state.isUserAuthenticated,
        authenticatedUser: state => state.user,
    },
    actions: {
        login(usernameOrEmail, password) {
            return new Promise((resolve, reject) => {
                let storedUser = this.getStoredUser();
                if (storedUser && this.validateUser(storedUser, usernameOrEmail, password)) {
                    console.log("User validated:", storedUser);
                    this.authenticateUser(storedUser);
                    resolve();
                } else {
                    console.error("Invalid credentials!");
                    reject(new Error("Invalid credentials!"));
                }
            });
        },
        register(email, username, password) {
            const storedUsers = this.getStoredUsers();
            if (this.userExists(storedUsers, email, username)) {
                throw new Error("Email or Username already exists!");
            }
            const newUser = this.createNewUser(email, username, password);
            storedUsers.push(newUser);
            this.saveUsers(storedUsers);
            this.authenticateUser(newUser);
        },
        savePreferences(username, preferences) {
            const storedUsers = this.getStoredUsers();
            const userIndex = storedUsers.findIndex(user => user.username === username);
            if (userIndex !== -1) {
                storedUsers[userIndex] = { ...storedUsers[userIndex], ...preferences };
                this.saveUsers(storedUsers);
                if (this.user && this.user.username === username) {
                    this.user = { ...this.user, ...preferences };
                    localStorage.setItem("user", JSON.stringify(this.user));
                }
            } else {
                throw new Error("User not found!");
            }
        },
        logout() {
            this.isUserAuthenticated = false;
            this.user = null;
        },
        updateUser(username, updatedUserData) {
            const storedUsers = this.getStoredUsers();
            const userIndex = storedUsers.findIndex(user => user.username === username);
            if (userIndex !== -1) {
                storedUsers[userIndex] = { ...storedUsers[userIndex], ...updatedUserData };
                if (updatedUserData.userPreferences) {
                    storedUsers[userIndex].userPreferences = [...updatedUserData.userPreferences];
                }
                if (this.user && this.user.username === username) {
                    this.user = { ...this.user, ...updatedUserData };
                    if (updatedUserData.userPreferences) {
                        this.user.userPreferences = [...updatedUserData.userPreferences];
                    }
                    localStorage.setItem("user", JSON.stringify(this.user));
                }
                this.saveUsers(storedUsers);
            } else {
                throw new Error("User not found!");
            }
        },
        getStoredUsers() {
            return JSON.parse(localStorage.getItem("users")) || [];
        },
        getStoredUser() {
            return JSON.parse(localStorage.getItem("user"));
        },
        validateUser(storedUser, usernameOrEmail, password) {
            return (storedUser.username === usernameOrEmail || storedUser.email === usernameOrEmail) && storedUser.password === password;
        },
        authenticateUser(user) {
            this.isUserAuthenticated = true;
            this.user = user;
            const weatherStore = useWeatherStore();
            weatherStore.updateUserWeather(this.user.userRegion, this.user.userLocations);
        },
        userExists(storedUsers, email, username) {
            return storedUsers.some(user => user.email === email || user.username === username);
        },
        createNewUser(email, username, password) {
            return {
                username,
                email,
                password,
                nimbusCoins: 50,
                userPreferences: [],
                allowGamification: false,
                selectedAvatar: "/path/to/default-avatar.png",
                userLang: "en",
                userRegion: { latitude: 0, longitude: 0, region: "" },
                userLocations: [],
            };
        },
        saveUsers(users) {
            localStorage.setItem("users", JSON.stringify(users));
        },
    },
    persist: true,
});
