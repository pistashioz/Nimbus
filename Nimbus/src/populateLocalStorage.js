function populateLocalStorage() {
    console.log("populateLocalStorage called");
    let user = {
      username: "testUser",
      password: "testPassword",
      email: "test@example.com",
      nimbusCoins: 50,
      userPreferences: ["Temperature", "Wind", "Precipitation"],
      allowGamification: false,
      selectedAvatar: "/path/to/default-avatar.png",
      userLang: "en",
      userRegion: { latitude: 40.7128, longitude: -74.006, region: "New York" },
      userLocations: [
        { latitude: 34.0522, longitude: -118.2437, region: "Los Angeles" },
        { latitude: 51.5074, longitude: -0.1278, region: "London" },
        { latitude: 35.6895, longitude: 139.6917, region: "Tokyo" },
        { latitude: -33.8688, longitude: 151.2093, region: "Sydney" },
      ],
    };
    localStorage.setItem("user", JSON.stringify(user));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ username: user.username, password: user.password, email: user.email });
    localStorage.setItem("users", JSON.stringify(users));
  }
  if (!localStorage.getItem("user")) {
    populateLocalStorage();
  } else {
    console.log("User already in localStorage");
  }