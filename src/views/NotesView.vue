<script setup>
import NoteCard from '@/components/NoteCard.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const notes = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get('/api/notes');
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
            <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
                <NoteCard v-for="note in notes" :key="note.id" :note="note" />
            </div>
        </div>
    </main>
</template>
