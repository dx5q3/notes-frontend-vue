<script setup>
import { ref, onMounted, computed } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useAlertStore } from '@/store/alert';
import BACKEND from '@/helpers/axiosHelper';

const route = useRoute();
const router = useRouter();

const { raiseAlert } = useAlertStore();

const id = route.params.id;
const note = ref({});

onMounted(async () => {
    try {
        const response = await BACKEND.get(`/api/notes/${id}`);
        note.value = response.data;
    } catch (error) {
        raiseAlert('error', error.message);
        router.push('/');
    }
});

const convertDate = (date) => {
    var b = date.split(/\D+/);
    const fdate = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    return fdate;
};

const createdAt = computed(() => {
    return convertDate(state.note.createdAt);
});

const updatedAt = computed(() => {
    return NaN;
});
</script>

<template>
    <main class="mx-auto justify-center max-w-2xl px-8 py-4 bg-white shadow-md dark:shadow-none dark:bg-gray-900">
        <div class="flex items-center justify-between mt-4">
            <p class="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                {{ note.author }}
            </p>
            <RouterLink :to="'/note/' + note.id + '/edit'"
                class="flex px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
                Edit
            </RouterLink>
        </div>
        <div class="mt-6">
            <p class="text-xl font-bold text-gray-700 dark:text-white">{{ note.title }}</p>
            <p class="mt-2 text-gray-600 dark:text-gray-300">{{ note.text }}</p>
        </div>
        <div class="flex items-center justify-between mt-4">
            <div>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Created at: {{ note.createdAt }}
                </p>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Updated at {{ note.updatedAt }}:
                </p>
            </div>
        </div>
    </main>
</template>