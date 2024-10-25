import { defineStore } from 'pinia';
import {ref, computed, watch} from 'vue';

export const useAlertStore = defineStore('alert', () => {
    const type = ref('');
    const message = ref('');

    const getAlert = computed(() => { return { type: type.value, message: message.value } });
    const raiseAlert = (newType, newMessage) => {
        type.value = newType;
        message.value = newMessage;
    }
    const clearAlert = () => {
        type.value = '';
        message.value = ''; 
    };
    
    watch(message, ()=>{
        setTimeout(clearAlert, 10000);
    });

    return { type, message, getAlert, raiseAlert,clearAlert }
});