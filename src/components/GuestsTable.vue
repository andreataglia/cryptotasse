<template>
    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Step</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Social Network</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email & Cellphone</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" class="relative px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="person in guestList" :key="person.email">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                        :class="{
                                            'bg-green-100': person.step === 3,
                                            'text-green-800': person.step === 3,
                                            'bg-yellow-100': person.step === 2,
                                            'text-yelllow-800': person.step === 2,
                                            'bg-red-100': person.step === 1,
                                            'text-red-800': person.step === 1,
                                        }"
                                    >
                                        {{ person.step }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div v-if="!!person.image" class="flex-shrink-0 h-10 w-10 mr-4">
                                            <img class="h-10 w-10 rounded-full" :src="person.image" alt="" />
                                        </div>
                                        <div>
                                            <div class="text-sm font-medium text-gray-900">
                                                {{ person.firstName }}
                                            </div>
                                            <div class="text-sm text-gray-500">
                                                {{ person.lastName }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ person.social.mostUsed }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ person.country }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ person.email }}</div>
                                    <div class="text-sm text-gray-500 mt-1">{{ person.cellphone }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ person.date.toLocaleString() }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button @click="handleAddNote(person)" class="text-indigo-600 hover:text-indigo-900">Note</button>
                                </td>
                            </tr>
                            <tr v-if="guestList.length === 0">
                                <td colspan="7" class="px-6 py-4 whitespace-nowrap text-center">No results available</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <AddNote v-if="currentGuest" v-model="open" :guest="currentGuest" />
    </div>
</template>

<script setup lang="ts">
import { getAuth } from 'firebase/auth'
import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore'
import { computed, onBeforeMount, ref } from 'vue'
import { db } from '../firebase'
import { getGuestsQueryByHostId } from '../services/guest'
import { Guest, isGuest, Step } from '../types'
import AddNote from './AddNote.vue'

const getColor = (step: Step) => {
    switch (step) {
        case 1:
            return 'red'
        case 2:
            return 'yellow'
        case 3:
            return 'green'
        default:
            throw Error('Not a step type')
    }
}

const guestList = ref<Guest[]>([])

const open = ref(false)
const currentGuest = ref<Guest | null>(null)

const handleAddNote = (guest: Guest) => {
    currentGuest.value = guest
    open.value = true
}

onBeforeMount(async () => {
    const user = getAuth().currentUser
    let unsubscribe: Unsubscribe | undefined

    if (user) {
        unsubscribe = onSnapshot(getGuestsQueryByHostId(user.uid), (querySnapshot) => {
            const updatedGuests: Guest[] = []
            querySnapshot.docs.forEach((doc) => {
                const guest = { id: doc.id, ...doc.data(), date: new Date(doc.data().date.seconds * 1000) }
                if (isGuest(guest)) {
                    updatedGuests.push(guest)
                }
            })

            guestList.value = updatedGuests
        })
    } else {
        unsubscribe && unsubscribe()
    }
})

// const people: Guest[] = [
//     {
//         id: '000001',
//         step: 3,
//         firstName: 'Mario',
//         lastName: 'Rossi',
//         social: { mostUsed: 'facebook' },
//         country: 'Italy',
//         email: 'mario.rossi@example.com',
//         cellphone: '+391234567890',
//         date: new Date(),
//         image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//     },
//     {
//         id: '000002',
//         step: 1,
//         firstName: 'Jane',
//         lastName: 'Cooper',
//         social: { mostUsed: 'facebook' },
//         country: 'UK',
//         email: 'jane.cooper@example.com',
//         cellphone: '+391234567890',
//         date: new Date(),
//         image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//     },
//     {
//         id: '000003',
//         step: 2,
//         firstName: 'Mark',
//         lastName: 'Hamill',
//         social: { mostUsed: 'Twitter' },
//         country: 'USA',
//         email: 'mark.hamill@example.com',
//         cellphone: '+391234567890',
//         date: new Date(),
//         image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//     },
// ]
</script>
