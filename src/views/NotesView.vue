<script setup>
import NoteCard from '@/components/NoteCard.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';


const notes = ref([]);

const url = import.meta.env.VITE_BACKEND_HOST;

onMounted(async () => {
    try {
        const response = await axios.get(`${url}/notes`, {
            headers: {
                authorization: localStorage.token
            }
        });
        notes.value = response.data;
    } catch (error) {
        console.error('Error fetching jobs', error);
    }
});
</script>

<template>
    <main class="bg-white dark:bg-gray-900">
        <div class="container px-6 py-10 mx-auto">
            <h1 class=" text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">Your notes</h1>
            <div v-if="notes.length === 0"
                class="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
                <div class="w-full lg:w-1/2">
                    <div class="lg:max-w-lg">
                        <h1 class="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl">
                            It seems you don'd have any notes...
                        </h1>
                        <p class="mt-4 text-gray-600 dark:text-gray-300">
                            Start by creating a
                            <RouterLink
                                class="text-gray-700 transition-colors duration-300 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                                to="/notes/new">New note</RouterLink>
                        </p>
                        <div class="grid gap-6 mt-8 sm:grid-cols-2">
                            <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>

                                <span class="mx-3">Create</span>
                            </div>

                            <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>

                                <span class="mx-3">Edit</span>
                            </div>

                            <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>

                                <span class="mx-3">Delete</span>
                            </div>

                            <div class="flex items-center text-gray-800 -px-3 dark:text-gray-200">
                                <svg class="w-5 h-5 mx-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>

                                <span class="mx-3">Cognito identity</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-center w-full h-96 lg:w-1/2">
                    <img class="object-cover w-full h-full max-w-2xl rounded-md"
                        src="https://images.unsplash.com/photo-1555181126-cf46a03827c0" alt="glasses photo">
                </div>
            </div>
            <div v-if="notes.length !== 0"
                class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
                <NoteCard v-for="note in notes" :key="note.id" :note="note" />
            </div>
        </div>
    </main>
</template>
