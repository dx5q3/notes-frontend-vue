import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const username = ref('');

    const getUser = computed(() => { return { username: username.value } });

    const setAuth = (token) => {
        localStorage.token = token;
        username.value = token.split('@')[0]; // change with actual logic
    }

    const clearAuth = () => {
        username.value = '';
        delete localStorage.token;
    };
    return { username, getUser, setAuth, clearAuth }
});