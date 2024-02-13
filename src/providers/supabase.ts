import { ref, App } from "vue";
import { supabase } from "../config/supabase";

const userName = ref<undefined | string>(undefined);
const userId = ref<undefined | string>(undefined);
const userIsVerified = ref<boolean>(false);

import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast({
  position: "top",
});

function isUserVerified() {
  if (!userId.value) {
    $toast.error("You need to login to leave a review");
    return false;
  }
  if (!userIsVerified.value) {
    $toast.error("You need to verify your email to leave a review");
    return false;
  }
  return true;
}

async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (!error) {
    updateUserName();
  }
  return { data, error };
}

async function signup(
  email: string,
  password: string,
  name: string | undefined = undefined,
) {
  const res_signup = await supabase.auth.signUp({
    email,
    password,
  });

  if (res_signup.error) {
    return { data: res_signup.data, error: res_signup.error };
  }
  const newId = res_signup.data.user.id;
  if (!newId) {
    return {
      data: res_signup.data,
      error: { message: "New user account is not made" },
    };
  }
  const res_user_profile = await supabase.from("user_profiles").insert({
    user_id: newId,
    name,
  });
  if (res_user_profile.error) {
    return {
      data: res_user_profile.data,
      error: { message: "The email address is already used" },
    };
  }
  if (res_user_profile.data) {
    userName.value = res_user_profile.data.name;
  }
  return { data: res_user_profile.data, error: res_user_profile.error };
}

async function logout() {
  await supabase.auth.signOut();
  updateUserName();
}

async function updateUserName() {
  // Get user ID
  supabase.auth.getSession().then((res) => {
    const _session = res.data.session;
    if (!_session) {
      userId.value = undefined;
      userName.value = undefined;
      userIsVerified.value = false;
      return;
    }
    const newUserId = _session.user.id;

    if (newUserId) {
      userId.value = newUserId;
    } else {
      userId.value = undefined;
      userName.value = undefined;
      return;
    }
    // Is verified
    if (_session.user.confirmed_at) {
      userIsVerified.value = true;
    } else {
      userIsVerified.value = false;
    }

    supabase
      .from("user_profiles")
      .select("name")
      .then((res) => {
        const data = res.data;
        if (data) {
          userName.value = data[0].name;
        } else {
          userName.value = undefined;
        }
      });
  });
}

export function provideSupabase(app: App) {
  updateUserName();
  app.provide("userName", {
    userName,
    userId,
    login,
    signup,
    logout,
    isUserVerified,
  });
}
