<script setup>
import { onBeforeUpdate, ref, computed } from 'vue';
import { useAlertStore } from '@/store/alert';
import axios from 'axios';

const { raiseAlert } = useAlertStore();

const props = defineProps({
    note: Object
});

const text = ref("");
const title = ref("");
const isEditPage = ref(false);

onBeforeUpdate(() => {
    if (typeof props.note !== 'undefined') {
        text.value = props.note.text;
        title.value = props.note.title;
        isEditPage.value = true;
    }
});

const saveNote = () => {
    isEditPage.value ? console.log("edit") : newNote();
};

const newNote = async () => {
    try {
        await axios.post('/api/notes', {'text': text.value, 'title': title.value});
        raiseAlert("success", "Note added successfully.");
    } catch (error) {
        console.log(error);
    } 
};

const deleteNote = () => {
    console.log("delete");
};
</script>

<template>
    <div class="w-full max-w-2xl mx-auto mt-6">
        <form>
            <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Title</label>
                <input type="text" placeholder="My beatiful note" v-model="title"
                    class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>
            <div class="mt-6">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Text</label>
                <textarea placeholder="Lorem ipsum..." v-model="text"
                    class="block min-h-60 w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>
            <div class="mt-8 space-x-4">
                <button @click.prevent="saveNote"
                    class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    Save
                </button>
                <button @click.prevent="deleteNote" v-if="isEditPage"
                    class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                    Delete
                </button>
            </div>
        </form>
    </div>
</template>