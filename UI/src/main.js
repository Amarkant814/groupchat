import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import OverlayPanel from 'primevue/overlaypanel';

import { Form, InputValidator, ErrorMessage } from "./plugins/validate";

import Dialog from 'primevue/dialog';
import "./assets/scss/main.scss";
import '/node_modules/primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';

import 'primeicons/primeicons.css'
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
import moment from "moment-timezone";
const app = createApp(App);
app.config.globalProperties.$filters = {
  formatDate(
    dateValue,
    format = "DD/MM/YYYY | hh:mm:ss A",
    convertMillisecToSec = 1000
  ) {
    return moment.unix(dateValue / convertMillisecToSec).format(format);
  },
};
app.config.globalProperties.$moment = moment;

app.component("Dialog", Dialog);
app.component("Form", Form);
app.component("InputValidator", InputValidator);
app.component("ErrorMessage", ErrorMessage);
app.component("Toast", Toast);
app.component("OverlayPanel", OverlayPanel);

app.use(ToastService);
app.use(PrimeVue);
app.use(router);
app.use(store);
app.mount("#app");
export default app;
