<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useAlertStore } from '@/store/alert'
import axios from "axios";

const router = useRouter();
const { setAuth } = useAuthStore();
const { raiseAlert } = useAlertStore();

const email = ref('');
const password = ref('');

const url = import.meta.env.VITE_COGNITO_HOST;
const clientId = import.meta.env.VITE_COGNITO_CLIENTID;

const handleSubmit = async () => {
    try {
        const res = await axios.post(url, {
            AuthParameters: {
                USERNAME: email.value,
                PASSWORD: password.value,
            },
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: clientId,
        }, {
            headers: {
                'Content-Type': 'application/x-amz-json-1.1',
                'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
            }
        });
        setAuth(res.data.AuthenticationResult.IdToken);
        router.push('/');
    } catch (error) {
        raiseAlert("error", error.response.data.message)
    }
};
</script>

<template>
    <main class="bg-white dark:bg-gray-900">
        <div class="container flex items-center justify-center min-h-full px-6 mx-auto">
            <form class="w-full max-w-md" @submit.prevent="handleSubmit">
                <h1 class=" text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">sign In</h1>
                <div class="relative flex items-center mt-8">
                    <span class="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </span>
                    <input type="email" v-model="email"
                        class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Email address">
                </div>
                <div class="relative flex items-center mt-4">
                    <span class="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </span>

                    <input type="password" v-model="password"
                        class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Password">
                </div>
                <div class="mt-6">
                    <button type="submit"
                        class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Sign in
                    </button>

                    <div class="mt-6 text-center ">
                        <RouterLink to="/signup" class="text-sm text-blue-500 hover:underline dark:text-blue-400">
                            Don’t have an account yet? Sign up
                        </RouterLink>
                    </div>
                </div>
            </form>
        </div>
    </main>


</template>