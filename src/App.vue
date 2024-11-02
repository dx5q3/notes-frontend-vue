<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Alert from './components/Alert.vue';
import { onBeforeMount, onBeforeUpdate, onMounted } from 'vue';
import { useAuthStore } from './store/auth';

const authStore = useAuthStore();

onBeforeMount(() => {
    if (typeof localStorage.token !== 'undefined') {
        authStore.setAuth(localStorage.token);
    }
});
</script>

<template>
    <Navbar />
    <RouterView />
    <Footer />
</template>