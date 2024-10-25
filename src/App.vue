<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Alert from './components/Alert.vue';
</script>

<template>
  <Navbar />
  <Alert />
  <RouterView />
  <Footer />
</template>