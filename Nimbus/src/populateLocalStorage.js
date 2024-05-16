// src/populateLocalStorage.js
function populateLocalStorage() {
    const userData = {
        username: "testUser",
        password: "testPassword",
        email: "test@example.com",
        nimbusCoins: 50,
        userPreferences: ["Temperature", "Wind", "Precipitation"],
        allowGamification: false,
        selectedAvatar: '/path/to/default-avatar.png', // Set a path to a default avatar image
        userLang: "en",
        userRegion: {
            latitude: 40.7128,
            longitude: -74.0060,
            region: "New York"
        },
        userLocations: [
            {
                latitude: 34.0522,
                longitude: -118.2437,
                region: "Los Angeles"
            },
            {
                latitude: 51.5074,
                longitude: -0.1278,
                region: "London"
            },
            {
                latitude: 35.6895,
                longitude: 139.6917,
                region: "Tokyo"
            },
            {
                latitude: -33.8688,
                longitude: 151.2093,
                region: "Sydney"
            }
        ]
    };

    localStorage.setItem('user', JSON.stringify(userData));

    // Add dummy user to the users array in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({
        username: userData.username,
        password: userData.password,
        email: userData.email
    });
    localStorage.setItem('users', JSON.stringify(users));
}

// Check if localStorage is already populated to avoid overwriting
if (!localStorage.getItem('user')) {
    populateLocalStorage();
}
