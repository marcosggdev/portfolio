import portfolio from "../assets/img/portfolio.webp";
import Portfolio from "../pages/projects/Portfolio.vue";
import portfolioDesktopPreviewVideo from "@/assets/vid/portfolio-preview-desktop.mp4";
import portfolioMobilePreviewVideo from "@/assets/vid/portfolio-preview-mobile.mp4";
import portfolioPosterDesktop from "@/assets/vid/portfolio-preview-desktop.jpg";
import portfolioPosterMobile from "@/assets/vid/portfolio-preview-mobile.jpg";

export default {
  portfolio: {
    title: "Portfolio",
    icon: "mdi:package-variant-closed",
    description: "Por supuesto, esta página se incluye como proyecto",
    projectHref: "/proyectos/portfolio",
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
        id: "previsualizacion",
        title: "Previsualización",
        icon: "lucide:images",
      },
      {
        id: "observaciones",
        title: "Observaciones",
        icon: "lucide:gauge",
      },
    ],

    video: {
      srcDesktop: portfolioDesktopPreviewVideo,
      srcMobile: portfolioMobilePreviewVideo,
      posterDesktop: portfolioPosterDesktop,
      posterMobile: portfolioPosterMobile,
      timestamps: [
        {
          id: 1,
          start: 0,
          end: 7,
          title: "Interfaz",
          text: "La página utiliza una interfaz elegante y pulida para mostrar la información importante de forma concisa, sin demasiados elementos que capten la atención.",
        },
        {
          id: 2,
          start: 7,
          end: 17,
          title: "Componentes avanzados",
          text: "He desarrollado algunos componentes de interfaz avanzados para demostrar mis capacidades técnicas, como el componente AnimatedGradientSVG, que muestra un texto y resalta los bordes del mismo de forma dinámica en función de la posición del ratón.",
        },
        {
          id: 3,
          start: 26,
          end: 30,
          title: "Uso de Vue Layouts",
          text: "La página Proyectos utiliza una vista de archivo de los proyectos que he añadido, y el router utiliza una vista específica para cada proyecto, basado en el :name de las rutas de la forma: '/proyectos/:name'.",
        },
        {
          id: 4,
          start: 32,
          end: 40,
          title: "Uso de Vue Layouts",
          text: "Cada proyecto utiliza un componente común para organizar la información y así reutilizar código para la interfaz, como se haría en un CMS. Se utiliza la información de un archivo JSON sobre cada proyecto para saber qué assets necesita, como la imagen de preview o el vídeo de preview de la navegación por la página, mientras que el contenido utiliza un componente para dejar explícito el contenido y los enlaces del aside.",
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
};
