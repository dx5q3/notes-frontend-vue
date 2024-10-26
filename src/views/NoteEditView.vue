<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '@/store/alert';
import NoteForm from '@/components/NoteForm.vue';
import BACKEND from '@/helpers/axiosHelper';

const route = useRoute();
const router = useRouter();

const { raiseAlert } = useAlertStore();

const note = ref({});

const id = route.params.id;

onMounted(async () => {
    try {
        const response = await BACKEND.get(`/notes/${id}`);
        note.value = response.data;
    } catch (error) {
        router.push('/')
        raiseAlert('error', error.message);
    }

});
</script>

<template>
    <main class="bg-white dark:bg-gray-900">
        <div class="container flex flex-col items-center mt-8 min-h-full px-6 mx-auto">
            <h1
                class="mt-4 text-2xl font-semibold tracking-wide text-center text-gray-900 capitalize md:text-3xl dark:text-white">
                Edit note
            </h1>

            <NoteForm :note="note" :is-edit-page="true" />
        </div>
    </main>
</template>