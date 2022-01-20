<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="Register" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input
                            v-model="email"
                            id="email-address"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input
                            v-model="password"
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                    <div>
                        <label for="password-confirm" class="sr-only">Password (confirm)</label>
                        <input
                            v-model="passwordConfirm"
                            id="password-confirm"
                            name="password-confirm"
                            type="password"
                            autocomplete="current-password"
                            required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password (confirm)"
                        />
                    </div>
                </div>

                <div v-if="errorMessage" class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {{ errorMessage }}
                </div>

                <div>
                    <button
                        type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LockClosedIcon } from '@heroicons/vue/solid'
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth'
import { ref } from '@vue/reactivity'

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errorMessage = ref('')

const Register = async () => {
    const auth = getAuth()
    try {
        if (password.value !== passwordConfirm.value) {
            throw new Error('Passwords are not the same')
        }

        const user = await createUserWithEmailAndPassword(auth, email.value, password.value)
        console.log(user)
    } catch (err) {
        errorMessage.value = (err as Error).message
    }
}
</script>
