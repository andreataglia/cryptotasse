<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { onBeforeMount } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from '@firebase/auth'

const router = useRouter()
const route = useRoute()

onBeforeMount(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            router.replace('/login')
        } else if (route.path === '/login' || route.path === '/register') {
            router.replace('/')
        }
    })
})
</script>

<template>
    <router-view />
</template>
