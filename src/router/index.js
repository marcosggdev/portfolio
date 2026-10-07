import { createRouter, createWebHistory } from "vue-router";

// layouts
import DefaultLayout from "../layouts/DefaultLayout.vue";
import ProjectsLayout from "../layouts/ProjectsLayout.vue";
import SingleProjectLayout from "../layouts/SingleProjectLayout.vue";
// pages
import Index from "../pages/Index.vue";
import Contact from "../pages/Contact.vue";
import ArchiveProjects from "../pages/ArchiveProjects.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "index",
        component: Index,
        meta: {
          label: "Inicio",
          group: "main",
        },
      },
      {
        path: "proyectos",
        component: ProjectsLayout,
        children: [
          {
            path: "",
            name: "projects",
            component: ArchiveProjects,
            meta: {
              label: "Proyectos",
              group: "main",
            },
          },
          {
            path: ":slug",
            component: SingleProjectLayout,
            meta: {
              label: "Proyecto",
            },
          },
        ],
      },
      {
        path: "contacto",
        name: "contact",
        component: Contact,
        meta: {
          label: "Contacto",
          group: "main",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        // Atrás / adelante
        if (savedPosition) {
          resolve(savedPosition);
          return;
        }

        // Ancla
        if (to.hash) {
          const target = document.querySelector(to.hash);

          if (target) {
            const offset = 128; // mt-32 = 8rem = 128px

            const top =
              target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
              top,
              behavior: "smooth",
            });
          }

          resolve();
          return;
        }

        // Cambio de página normal
        const el = document.scrollingElement || document.documentElement;

        el.scrollTop = 0;

        resolve();
      });
    });
  },
});

export default router;
