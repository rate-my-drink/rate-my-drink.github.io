import { ref , App} from "vue";

export function provideSupabase(app: App) {
  const userName = ref(null);

  app.provide("userName", userName);
}
