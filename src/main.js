import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { provideSupabase } from "./providers/supabase";

const app = createApp(App);
provideSupabase(app);
app.mount("#app");
