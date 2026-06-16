import { createApp } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./validation/ajv";

//css fonts
import "@fontsource/days-one";

//tailwind and main css
import "./assets/css/main.css";

import App from "./App.vue";
import router from "./router";

gsap.registerPlugin(ScrollTrigger);

const app = createApp(App);
app.use(router);
app.mount("#app");
