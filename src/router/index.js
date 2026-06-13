import { createRouter, createWebHistory } from "vue-router";

// Views
import Index from "../pages/Index.vue";
import Projects from "../pages/Projects.vue";
const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Index,
  },
  {
    path: "/proyectos",
    name: "Proyectos",
    component: Projects,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
