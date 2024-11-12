<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    note: Object,
});

const truncTitle = computed(() => {

    if (props.note.title.split(" ").length > 5) {
        return props.note.title.split(" ").slice(0, 5).join(" ") + "...";
    } else {
        return props.note.title;
    }
});

const truncText = computed(() => {
    return props.note.text.split(" ").slice(0, 15).join(" ") + "...";
});

const createdAt = computed(() => {
    return (new Date(props.note.createdAt)).toUTCString()
});
</script>

<template>
    <div class="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-between">
            <span class="text-sm font-light text-gray-600 dark:text-gray-400">{{ createdAt }}</span>
        </div>
        <div class="mt-2">
            <p class="text-xl font-bold text-gray-700 dark:text-white">{{ truncTitle }}</p>
            <p class="mt-2 text-gray-600 dark:text-gray-300">{{ truncText }}</p>
        </div>
        <div class="flex items-center justify-between mt-4">
            <RouterLink :to="'/note/' + note.id" class="text-blue-600 dark:text-blue-400 hover:underline">
                Read more
            </RouterLink>

            <div class="flex items-center">
                <p class="font-bold text-gray-700 dark:text-gray-200">
                    {{ note.userName }}
                </p>
            </div>
        </div>
    </div>
</template>