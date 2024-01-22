import { ref , App} from "vue";
import { supabase } from "../config/supabase"

const userName = ref<undefined|string>(undefined);
const userId = ref<undefined|string>(undefined);
const userIsVerified = ref<boolean>(false)
async function login(email: string, password: string) {
  const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password
  })
  if(!error){
    updateUserName()
  }
  return {data, error}
}

async function signup(email: string, password: string, name: string | undefined = undefined) {
  const {data, error} = await supabase.auth.signUp({
      email,
      password
  })
  
  if(error){
    return {data, error}
  }
  const newId = data.user.id
  if(newId){
    userId.value = newId
  }else{
    userId.value = undefined
    return {data, error: {message: "New user account is not made"}}
  }
  supabase.from("user_profiles").insert({
    user_id: userId.value,
    name
  }).then(
    (res) => {
      userName.value = name
    }
  )
}

async function logout() {
  await supabase.auth.signOut()
  updateUserName()
}

async function updateUserName() {
  // Get user ID
  supabase.auth.getSession().then((res) => {
    const _session = res.data.session
    if(!_session){
      userId.value = undefined
      userName.value = undefined
      userIsVerified.value = false
      return
    }
    const newUserId = _session.user.id

    if (newUserId) {
        userId.value = newUserId
    } else {
      userId.value = undefined
      userName.value = undefined
      return
    }
    // Is verified
    if(_session.user.confirmed_at){
      userIsVerified.value = true
    }else{
      userIsVerified.value = false
    }
    
    supabase.from("user_profiles").select("name").then((res) => {
      const data = res.data
      if(data){
        userName.value = data[0].name
      }else{
        userName.value = undefined
      }
    }
    )
  }
)
}

export function provideSupabase(app: App) {
  updateUserName()
  app.provide("userName", {userName, userId, login, signup, logout, userIsVerified});
}
