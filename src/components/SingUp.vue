<script setup lang="ts">
import { inject, ref } from 'vue';

const { login, signup } = inject('userName')
const emit = defineEmits(['update:modelValue']);
const email = ref("")
const name = ref("")
const password = ref("")
const isSignUp = ref(false)

const clickBackground = (): void => {
    emit('update:modelValue', false);
};

async function _signup() {
    await signup(
        email.value,
        password.value,
        name.value
    )
    emit('update:modelValue', false);
}

async function _login() {
    await login(email.value, password.value
    )
    emit('update:modelValue', false);
}

</script>
<template>
    <div class="h-screen w-screen fixed bg-transparent-black-50" @click="clickBackground">

        <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2" v-on:click.stop>
                <div class="bg-slate-200 p-8 rounded-3xl shadow-md text-black w-full ">
                    <div class="flex w-full justify-between">
                        <h1 @click="isSignUp = true" class="text-3xl text-center rounded-t-3xl"
                            :class="(isSignUp) ? 'bg-amber-400' : 'text-slate-500'">Sign up</h1>
                        <h1 @click="isSignUp = false" class="text-3xl text-center rounded-t-3xl"
                            :class="(isSignUp) ? 'text-slate-500' : 'bg-amber-400'">Log in</h1>
                    </div>
                    <div class="bg-amber-400 p-3 rounded-b-3xl" :class="(isSignUp) ? 'rounded-tr-3xl' : 'rounded-tl-3xl'">

                        <input v-show="isSignUp" type="text" class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="name" v-model="name" placeholder="Name" />

                        <input type="text" class="block border border-grey-light w-full p-3 rounded mb-4" name="email"
                            v-model="email" placeholder="Email" />

                        <input type="password" class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password" v-model="password" placeholder="Password" />

                        <div class="flex justify-between">
                            <button v-show="isSignUp" type="button" class="button" @click="_signup">Create Account</button>
                            <button v-show="!isSignUp" type="button" class="button" @click="_login">Login</button>

                        </div>
                    </div>

                    <div v-show="isSignUp" class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
