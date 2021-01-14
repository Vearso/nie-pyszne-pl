import { createApp } from "vue";
import { createI18n} from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import store,{key} from "./store";
import "./index.scss";
import messages from "./locales/en";

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
})

createApp(App)
    .use(store,key)
    .use(router)
    .use(i18n)
    .mount("#app");
