<script setup>
import axios from 'axios';
import { useAlertStore } from '@/store/alert';
import { useRouter } from 'vue-router'

const router = useRouter();

const props = defineProps({
    note: {
        type: Object,
        default: {
            title: "",
            text: ""
        }
    },
    isEditPage: Boolean
});

const { raiseAlert } = useAlertStore();

const url = import.meta.env.VITE_BACKEND_HOST;

const saveNote = () => {
    props.isEditPage ? editNote() : newNote();
};

const newNote = async () => {
    try {
        await axios.post(`${url}/notes`, {
            newText: props.note.text,
            newTitle: props.note.title
        }, {
            headers: {
                authorization: localStorage.token
            }
        });
        raiseAlert("success", "Note added successfully.");
        router.push("/");
    } catch (error) {
        raiseAlert("error", error.message);
    }
};

const editNote = async () => {
    try {
        await axios.patch(`${url}/notes/${props.note.id}`, {
            newText: props.note.text,
            newTitle: props.note.title
        }, {
            headers: {
                authorization: localStorage.token
            }
        });
        raiseAlert("success", "Note updated successfully.");
        router.go(-1);
    } catch (error) {
        raiseAlert("error", error.message);
    }
}

const deleteNote = async () => {
    try {
        await axios.delete(`${url}/notes/${props.note.id}`, {
            headers: {
                authorization: localStorage.token
            }
        });
        raiseAlert("success", "Note deleted successfully.");
        router.push("/");
    } catch (error) {
        raiseAlert("error", error.message);
    }
};
</script>

<template>
    <div class="w-full max-w-2xl mx-auto mt-6">
        <form>
            <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Title</label>
                <input type="text" placeholder="My beatiful note" v-model="note.title"
                    class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>

            <div class="mt-6">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Text</label>
                <textarea placeholder="Lorem ipsum..." v-model="note.text"
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