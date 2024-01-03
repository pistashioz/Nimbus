import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
    state: () => ({
      isUserAuthenticated: false,
      user: null,
      users: [
        { username: "maria", password: "54321"},
      ],
    }),
    getters: {
      getUser: (state) => state.user,
      isUser: (state) => state.isUserAuthenticated,
    },
    actions: {
      login(username, password) {
        const user = this.users.find(
          (user) => user.username == username && user.password == password
        );
        if (user) {
          this.isUserAuthenticated = true;
          this.user = user;
        } else {
          throw Error("User invalid!");
        }
      },
      logout() {
        this.isUserAuthenticated = false;
        this.user = null;
      },
    },  
    persist: true,
  });