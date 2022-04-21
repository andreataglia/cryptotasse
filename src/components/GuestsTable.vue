<template>
    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Person</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Step</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benefit</th>
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
                                    <div class="flex items-center">
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
                                    <div class="text-sm text-gray-900">{{ person.benefit || '/' }}</div>
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
                                    <div class="text-sm text-gray-900">{{ person.date.toDateString() }}</div>
                                    <div class="text-sm text-gray-500 mt-1">{{ person.date.toLocaleTimeString() }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button @click="handleAddNote(person)" class="text-indigo-600 hover:text-indigo-900">Note</button>
                                </td>
                            </tr>
                            <tr v-if="guestList.length === 0">
                                <td colspan="8" class="px-6 py-4 whitespace-nowrap text-center">No leads yet</td>
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
import { onSnapshot, Unsubscribe } from 'firebase/firestore'
import { onBeforeMount, ref } from 'vue'
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
</script>
