import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { provideSupabase } from "./providers/supabase";
import ToastPlugin from "vue-toast-notification";
import router from "./router";

const app = createApp(App);
provideSupabase(app);
app.use(router);

app.use(ToastPlugin);
app.mount("#app");
