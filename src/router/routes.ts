import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/MyBlog',
        component: () => import('pages/MyBlog/index.vue'),
        children: [],
      },
      // {
      //   path: '/MyBlog/:id',
      //   component: () => import('pages/MyBlog/_id.vue'),
      //   children: [],
      // },
      {
        path: '/MyDiary',
        component: () => import('pages/MyDiary/index.vue'),
        children: [],
      },
      {
        path: '/diaryDetail/:id',
        component: () => import('pages/MyDiary/diaryDetail.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
