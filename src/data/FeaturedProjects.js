import portfolio from "../assets/img/portfolio.png";
import mdoImg from "../assets/img/mdo.png";
import fallbackImg from "../assets/img/fallback.png";

export default [
  {
    image: portfolio,
    href: "/proyectos/portfolio",
    title: "Mi Portfolio",
    subtitle:
      "SPA sencilla hecha en Vue pero con una interfaz muy pulida y contenido de calidad.",
    text: "",
    brightness: 0.6,
  },
  {
    image: mdoImg,
    href: "/proyectos/mdo-corp-sl",
    title: "Página oficial de MDO Corp. S. L.",
    subtitle:
      "SPA dinámica y muy visual, con efectos avanzados y ambientación aérea",
    text: "",
    brightness: 0.5,
  },
  {
    image: fallbackImg,
    href: "#",
    title: "Próximamente...",
    subtitle: "",
    text: "",
    brightness: 0.7,
  },
];
