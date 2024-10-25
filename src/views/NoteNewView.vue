<script setup>
import NoteForm from '@/components/NoteForm.vue';
</script>

<template>
    <main class="bg-white dark:bg-gray-900">
        <div class="container flex flex-col items-center mt-8 min-h-full px-6 mx-auto">
            <h1
                class="mt-4 text-2xl font-semibold tracking-wide text-center text-gray-800 capitalize md:text-3xl dark:text-white">
                New note
            </h1>
            <NoteForm />
        </div>
    </main>
</template>