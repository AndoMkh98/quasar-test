import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/register',
    component: () => import('pages/RegisterPage.vue'),
  },

  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/events',
    component: () => import('pages/AllEvents.vue'),
  },

  {
    path: '/events/actions/:id',
    component: () => import('pages/EventActions.vue'),
  },
  {
    path: '/events/actions',
    component: () => import('pages/EventActions.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
