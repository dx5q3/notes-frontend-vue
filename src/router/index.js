import { createRouter, createWebHistory } from 'vue-router';
import NotesView from '@/views/NotesView.vue';
import SingInView from '@/views/SingInView.vue';
import SignUpView from '@/views/SignUpView.vue';
import NoteView from '@/views/NoteView.vue';
import NoteNewView from '@/views/NoteNewView.vue';
import NoteEditView from '@/views/NoteEditView.vue';

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
      component: SingInView
    },
    {
      path: "/signup",
      name: "signUp",
      component: SignUpView
    }
  ]
});

export default router;
