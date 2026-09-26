import mdo from "../assets/img/mdo.png";
import portfolio from "../assets/img/portfolio.png";

import MDOCorpSL from "../pages/projects/MDOCorpSL.vue";
import Portfolio from "../pages/projects/Portfolio.vue";

export default {
  portfolio: {
    title: "Portfolio",
    domain: "marcosggdev.vercel.app",
    href: "https://marcosggdev.vercel.app",
    text: "Desarrollé con Vue un portfolio visual y ordenado, con interfaz pulida y adaptada a todos los dispositivos",
    src: portfolio,
    component: Portfolio,

    navigation: [
      {
        id: "descripcion",
        title: "Descripción",
        icon: "lucide:file-text",
      },
      {
        id: "galeria",
        title: "Galería",
        icon: "lucide:images",
      },
      {
        id: "observaciones",
        title: "Observaciones",
        icon: "lucide:gauge",
      },
    ],

    video: {
      srcDesktop: "/src/assets/vid/portfolio-preview-desktop.mp4",
      srcMobile: "/src/assets/vid/portfolio-preview-mobile.mp4",

      timestamps: [
        {
          id: 1,
          start: 0,
          end: 15,
          title: "Inicio",
          text: "Aquí aparece la primera información.",
        },
        {
          id: 2,
          start: 15,
          end: 35,
          title: "Segundo punto",
          text: "Información correspondiente al segundo intervalo.",
        },
      ],
    },

    stack: [
      {
        icon: "simple-icons:vuedotjs",
        text: "Vue.js",
      },
      {
        icon: "simple-icons:javascript",
        text: "JavaScript",
      },
      {
        icon: "simple-icons:html5",
        text: "HTML5",
      },
      {
        icon: "simple-icons:css3",
        text: "CSS3",
      },
      {
        icon: "simple-icons:tailwindcss",
        text: "Tailwind CSS",
      },
    ],
  },

  "mdo-corp-sl": {
    title: "MDO Corp. S. L.",
    domain: "mdo-corp.vercel.app",
    href: "https://mdo-corp.vercel.app",
    text: "Desarrollé con Nuxt + Vue la página oficial de la empresa.",
    src: mdo,
    component: MDOCorpSL,

    navigation: [
      {
        id: "descripcion",
        title: "Descripción",
        icon: "lucide:file-text",
      },
      {
        id: "galeria",
        title: "Galería",
        icon: "lucide:images",
      },
      {
        id: "observaciones",
        title: "Observaciones",
        icon: "lucide:gauge",
      },
    ],

    stack: [
      {
        icon: "simple-icons:nuxtdotjs",
        text: "Nuxt",
      },
      {
        icon: "simple-icons:vuedotjs",
        text: "Vue.js",
      },
      {
        icon: "simple-icons:npm",
        text: "npm",
      },
      {
        icon: "simple-icons:git",
        text: "Git",
      },
      {
        icon: "simple-icons:postgresql",
        text: "PostgreSQL",
      },
      {
        icon: "simple-icons:supabase",
        text: "Supabase",
      },
      {
        icon: "simple-icons:gsap",
        text: "GSAP",
      },
    ],
  },
};
