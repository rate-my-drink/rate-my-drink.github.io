<script setup lang="ts">
import { supabase } from "../config/supabase"
import { ref } from 'vue';

const emit = defineEmits(['update:modelValue']);
const email = ref("")
const password = ref("")
const password2 = ref("")
const displayName = ref("")

const clickBackground = (): void => {
    emit('update:modelValue', false);
};

async function signup() {
    if (password.value == password2.value) {
        console.log("Create account")
        await supabase.auth.signUp({
            email: email.value,
            password: password.value,
        })
    }
}

</script>
<template>
    <div class="h-screen w-screen fixed bg-transparent-black-50" @click="clickBackground">

        <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2" v-on:click.stop>
                <div class="bg-slate-200 px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4" name="fullname"
                        v-model="displayName" placeholder="Name to Display" />

                    <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4" name="email"
                        v-model="email" placeholder="Email" />

                    <input type="password" class="block border border-grey-light w-full p-3 rounded mb-4" name="password"
                        v-model="password" placeholder="Password" />
                    <input type="password" class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password" v-model="password2" placeholder="Confirm Password" />

                    <button type="submit"
                        class="w-full text-center py-3 rounded-xl bg-green text-black bg-amber-700 hover:bg-amber-500 focus:outline-none my-1"
                        @click="signup">Create
                        Account</button>

                    <div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account?
                    <a class="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    </div>
</template>
  
