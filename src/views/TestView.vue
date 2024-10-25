<script setup>
import { useAlertStore } from '@/store/alert';
import { ref } from 'vue';

const { raiseAlert } = useAlertStore();
const text = ref('');

const addItem = () => {
    raiseAlert("success", text);
};

</script>

<template>
    <form v-on:submit.prevent="addItem">
        <input type="text" required v-model="text">
        <button type="submit">fire</button>
    </form>
</template>
