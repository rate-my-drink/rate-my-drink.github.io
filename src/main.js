import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { provideSupabase } from "./providers/supabase";
import router from "./router";

const app = createApp(App);
provideSupabase(app);
app.use(router);
app.mount("#app");
