import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
    const username = ref('');

    const getUser = computed(() => {
        return {
            username: username.value
        }
    });

    const setAuth = (token) => {
        localStorage.token = token;
        username.value = jwtDecode(token).username;
    }

    const clearAuth = () => {
        username.value = '';
        delete localStorage.token;
    };
    return { username, getUser, setAuth, clearAuth }
});