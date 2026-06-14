import { createRouter, createWebHistory } from "vue-router";
import LegalLayout from "../layouts/LegalLayout.vue";

// Views
import Index from "../pages/Index.vue";
import Projects from "../pages/Projects.vue";
import Contact from "../pages/Contact.vue";
import Privacy from "../pages/Privacy.vue";
import TermsAndConditions from "../pages/TermsAndConditions.vue";
import Cookies from "../pages/Cookies.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Index,
    meta: {
      label: "Inicio",
      group: "main",
    },
  },
  {
    path: "/proyectos",
    name: "projects",
    component: Projects,
    meta: {
      label: "Proyectos",
      group: "main",
    },
  },
  {
    path: "/contacto",
    name: "contact",
    component: Contact,
    meta: {
      label: "Contacto",
      group: "main",
    },
  },
  {
    path: "/legal",
    component: LegalLayout,
    children: [
      {
        path: "privacidad",
        name: "privacy",
        component: Privacy,
        meta: {
          label: "Privacidad",
          group: "legal",
        },
      },
      {
        path: "terminos-y-condiciones",
        name: "terms-and-conditions",
        component: TermsAndConditions,
        meta: {
          label: "Términos y Condiciones",
          group: "legal",
        },
      },
      {
        path: "cookies",
        name: "cookies",
        component: Cookies,
        meta: {
          label: "Cookies",
          group: "legal",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
});

export default router;
