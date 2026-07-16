import mdo from "../assets/img/mdo.png";
import MDOCorpSL from "../pages/projects/MDOCorpSL.vue";

export default {
  "mdo-corp-sl": {
    title: "MDO Corp. S. L. ",
    domain: "mdo-corp.vercel.app",
    href: "https://mdo-corp.vercel.app",
    text: "Desarrollé con Nuxt + Vue la página oficial de la empresa.",
    src: mdo,
    component: MDOCorpSL,
    galleryData: {
      images: [mdo],
      hotspots: [
        {
          imageIndex: 0,
          x: 300,
          y: 300,
          content: `
            test 1
          `,
          clickEffect: "zoomIn",
        },
        {
          imageIndex: 0,
          x: 100,
          y: 100,
          content: `
              test 2
          `,
          clickEffect: "zoomIn",
        },
      ],
    },
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
