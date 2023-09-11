import { ref , App} from "vue";
import { supabase } from "../config/supabase"

const userName = ref(null);
async function login(email: string, password: string) {
  await supabase.auth.signInWithPassword({
      email,
      password
  })
  updateUserName()
}

async function signup(email: string, password: string) {
  await supabase.auth.signUp({
      email,
      password
  })
  updateUserName()
}

async function logout() {
  await supabase.auth.signOut()
  updateUserName()
}


async function updateUserName() {
  const session = await supabase.auth.getSession()
  if (session.data && session.data.session) {
      userName.value = session.data.session.user.email
  } else {
      userName.value = null
  }
  console.log(session)
}

export function provideSupabase(app: App) {
  updateUserName()
  app.provide("userName", {userName, login, signup, logout});
}
