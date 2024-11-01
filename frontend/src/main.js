import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "normalize.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import VueTheMask from "vue-the-mask";

library.add(faArrowLeft, faGoogle, faApple);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(VueTheMask);
app.mount("#app");
