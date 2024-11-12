<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '@/store/alert';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const { raiseAlert } = useAlertStore();

const id = route.params.id;
const url = import.meta.env.VITE_BACKEND_HOST;

const note = ref({});

onBeforeMount(async () => {
    try {
        const response = await axios.get(`${url}/notes/${id}`, {
            headers: { authorization: localStorage.token }
        });

        note.value = {
            id: response.data.id,
            title: response.data.title,
            userName: response.data.userName,
            text: response.data.text.split("\n"),
            createdAt: (new Date(response.data.createdAt)).toUTCString(),
        }

        if (response.data.updatedAt !== response.data.createdAt) {
            note.value.updatedAt = (new Date(response.data.updatedAt)).toUTCString();
        } else {
            note.value.updatedAt = undefined;
        }

    } catch (error) {
        raiseAlert('error', error.message);
        router.push('/');
    }
});
</script>

<template>
    <main class="mx-auto justify-center max-w-2xl px-8 py-4 bg-white shadow-md dark:shadow-none dark:bg-gray-900">
        <div class="flex items-center justify-between mt-4">
            <p class="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                {{ note.userName }}
            </p>
            <RouterLink :to="'/note/' + note.id + '/edit'"
                class="flex px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
                Edit
            </RouterLink>
        </div>
        <div class="mt-6">
            <p class="text-xl font-bold text-gray-700 dark:text-white">{{ note.title }}</p>
            <p class="mt-2 text-gray-600 dark:text-gray-300" v-for="prg in note.text"> {{ prg }}</p>
        </div>
        <div class="flex items-center justify-between mt-4">
            <div>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Created at: {{ note.createdAt }}
                </p>
                <p v-if="note.updatedAt" class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Updated at: {{ note.updatedAt }}
                </p>
            </div>
        </div>
    </main>
</template>