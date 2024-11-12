import { createRouter, createWebHistory } from 'vue-router';
import NotesView from '@/views/NotesView.vue';
import SigninView from '@/views/SignInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import NoteView from '@/views/NoteView.vue';
import NoteNewView from '@/views/NoteNewView.vue';
import NoteEditView from '@/views/NoteEditView.vue';
import { useAuthStore } from '@/store/auth';
import { useAlertStore } from '@/store/alert';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: NotesView
        },
        {
            path: '/notes/new',
            component: NoteNewView
        },
        {
            path: '/note/:id',
            component: NoteView
        },
        {
            path: '/note/:id/edit',
            component: NoteEditView
        },
        {
            path: "/signin",
            name: "signIn",
            component: SigninView
        },
        {
            path: "/signup",
            name: "signUp",
            component: SignUpView
        },
        {
            path: "/signout",
            name: "signOut",
            component: {
                beforeRouteEnter(to, from, next) {
                    const authStore = useAuthStore();
                    const alsertStore = useAlertStore();
                    authStore.clearAuth();
                    alsertStore.raiseAlert('warning', 'You are signed out');
                    next("/signin");
                }
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const alsertStore = useAlertStore();
    if (authStore.getUser.username === "" &&
        to.fullPath !== '/signin' &&
        to.fullPath !== '/signup') {
        alsertStore.raiseAlert('warning', 'Please log in');

        next('/signin');
    }
    next();
});

export default router;
