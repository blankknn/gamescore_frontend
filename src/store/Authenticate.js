import { defineStore } from "pinia";

export const useAuthenticate = defineStore('auth', {
    state: () => ({
        isLoggedIn: localStorage.getItem('token') !== null,
        userId: null,
        isAdmin: localStorage.getItem('isAdmin') === "true",
    }),
    actions: {
        setLogin(auth) {
            this.isLoggedIn = auth;
            console.log(auth);
        },
        setId(id) {
            this.userId = id;
            console.log(id);
        },setIsAdmin(isAdmin) {
            this.isAdmin= isAdmin;
            localStorage.setItem('isAdmin', this.isAdmin)
        },
        initUserIdFromLocalStorage() {
            const userIdFromLocalStorage = localStorage.getItem('userId');
            if (userIdFromLocalStorage) {
                this.setId(userIdFromLocalStorage);
            }
        }
    },
});

