import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: () => import("@/views/ListView.vue"),
    },
    {
      path: "/products",
      name: "list",
      component: () => import("@/views/ListView.vue"),
    },
    {
      path: "/products/:id",
      name: "detail",
      component: () => import("@/views/DetailView.vue"),
    },
  ],
});

export default router;
