<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <TransitionRoot as="template" :show="modelValue">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="showDialog(false)">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:justify-center">
                                <div class="mt-3 text-center sm:mt-0 sm:ml-0 sm:text-center">
                                    <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900"> Note about {{ guestObject.firstName }} </DialogTitle>
                                    <div v-if="onEdit" class="mt-2">
                                        <div>
                                            <label for="note" class="block font-medium text-gray-700"> Editing </label>
                                            <div class="mt-1">
                                                <textarea
                                                    id="note"
                                                    name="note"
                                                    rows="10"
                                                    cols="50"
                                                    v-model="noteText"
                                                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    placeholder="Scrivi una nota qui..."
                                                />
                                            </div>
                                            <p class="mt-2 text-sm text-gray-500">Here you can write a small not about the selected Guest</p>
                                        </div>
                                    </div>
                                    <div v-else class="mt-2 text-justify">
                                        <p v-if="guestObject.note" class="p-4">
                                            {{ guestObject.note }}
                                        </p>
                                        <p v-else class="mt-2 text-sm text-gray-500">Here you can write a small not about the selected Guest</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="onEdit" class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                @click="updateNote(guestObject.id)"
                            >
                                <CheckIcon class="-ml-1 mr-2 h-5 w-5" />
                                Save
                            </button>
                            <button
                                type="button"
                                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                @click="onEdit = false"
                                ref="cancelButtonRef"
                            >
                                Cancel
                            </button>
                        </div>
                        <div v-else class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                @click="handleOnEdit"
                            >
                                <PencilIcon class="-ml-1 mr-2 h-5 w-5" />
                                Edit
                            </button>
                            <button
                                type="button"
                                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                @click="showDialog(false)"
                                ref="cancelButtonRef"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationIcon, PencilIcon, CheckIcon } from '@heroicons/vue/outline'
import { Guest } from '../types'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const props = defineProps<{
    modelValue: boolean
    guest: Guest
}>()

const emits = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const noteText = ref(props.guest.note)
const onEdit = ref(false)
const guestObject = ref(props.guest)

const updateNote = async (guestId: string) => {
    try {
        const response = await updateDoc(doc(db, 'guests', guestId), { note: noteText.value })
        console.log('response', response)
        guestObject.value.note = noteText.value
        onEdit.value = false
    } catch (error) {
        console.log('error', error)
    }
}

const showDialog = (value: boolean) => {
    emits('update:modelValue', value)
}

const handleOnEdit = () => {
    noteText.value = props.guest.note
    onEdit.value = true
}

// const open = ref(true)
</script>
