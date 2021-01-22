import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import router from "./router";
import store, { key } from "./store";
import "./index.scss";
import App from "./App.vue";
import messages from "./locales/en";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages
});

createApp(App)
  .use(store, key)
  .use(router)
  .use(i18n)
  .mount("#app");
