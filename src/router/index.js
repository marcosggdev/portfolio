import { createRouter, createWebHistory } from "vue-router";

// Views
import Index from "../pages/Index.vue";

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Index,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
